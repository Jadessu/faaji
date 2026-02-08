/**
 * Netlify serverless function — Eventbrite ticket data proxy.
 *
 * WHY SERVER-SIDE ONLY:
 * The Eventbrite Private Token grants full read/write access to the account.
 * Exposing it in client-side JavaScript would let anyone steal or misuse it.
 * This function runs on Netlify's servers so the token never reaches the browser.
 *
 * WHY ONLY THE PRIVATE TOKEN:
 * Eventbrite's v3 API requires the Private Token (OAuth bearer token) for
 * authenticated requests. The API Key, Client Secret, and Public Token are
 * used for OAuth flows and widget embedding — neither of which we need here.
 */

import type { Handler } from '@netlify/functions';

/* ── Eventbrite API response types (only the fields we read) ── */

interface EventbriteTicketCost {
  display: string;
  value: number;
}

interface EventbriteTicketClass {
  id: string;
  name: string;
  free: boolean;
  cost: EventbriteTicketCost | null;
  on_sale_status: string;
  sales_end: string | null;
  quantity_sold: number;
  quantity_total: number;
}

interface EventbriteTicketResponse {
  ticket_classes: EventbriteTicketClass[];
}

interface EventbriteEvent {
  id: string;
  url: string;
  is_series_parent?: boolean;
}

interface EventbriteSeriesResponse {
  events: EventbriteEvent[];
}

/* ── Safe shape returned to the frontend ── */

interface Ticket {
  id: string;
  name: string;
  price: string;
  isFree: boolean;
  isSoldOut: boolean;
  salesEnd: string | null;
  checkoutUrl: string;
}

interface CacheEntry {
  tickets: Ticket[];
  eventUrl: string;
  timestamp: number;
}

/* ── Simple in-memory cache (5 minutes) ── */

let cache: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

function getCached(): CacheEntry | null {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL_MS) {
    return cache;
  }
  return null;
}

/* ── Helper to call Eventbrite API ── */

async function ebFetch<T>(path: string, token: string): Promise<T> {
  const url = `https://www.eventbriteapi.com/v3${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Eventbrite ${path} → ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Resolve the next upcoming occurrence for a recurring series.
 * If the event is not a series, returns the event itself.
 */
async function resolveNextOccurrence(
  eventId: string,
  token: string,
): Promise<{ eventId: string; eventUrl: string }> {
  const event = await ebFetch<EventbriteEvent>(`/events/${eventId}/`, token);

  if (!event.is_series_parent) {
    return { eventId: event.id, eventUrl: event.url };
  }

  // Fetch the next upcoming occurrence
  const series = await ebFetch<EventbriteSeriesResponse>(
    `/series/${eventId}/events/?order_by=start_asc&time_filter=current_future&page_size=1`,
    token,
  );

  if (series.events?.length > 0) {
    return { eventId: series.events[0].id, eventUrl: series.events[0].url };
  }

  // Fallback to the parent event if no live occurrences
  return { eventId: event.id, eventUrl: event.url };
}

/* ── Normalize a single ticket into the safe frontend shape ── */

function normalizeTicket(tc: EventbriteTicketClass, eventUrl: string): Ticket {
  // Build a checkout URL that opens the event page scrolled to tickets.
  // The #tickets anchor takes the user directly to the ticket selection area.
  const checkoutUrl = `${eventUrl}#tickets`;

  return {
    id: tc.id,
    name: tc.name,
    price: tc.free ? 'Free' : tc.cost?.display ?? 'N/A',
    isFree: tc.free,
    isSoldOut: tc.on_sale_status === 'SOLD_OUT',
    salesEnd: tc.sales_end ?? null,
    checkoutUrl,
  };
}

/* ── Sort: Free first, then by ascending price ── */

function sortTickets(tickets: Ticket[]): Ticket[] {
  return tickets.sort((a, b) => {
    if (a.isFree && !b.isFree) return -1;
    if (!a.isFree && b.isFree) return 1;
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
    return priceA - priceB;
  });
}

/* ── Handler ── */

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Return cached data if fresh
  const cached = getCached();
  if (cached) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ tickets: cached.tickets, eventUrl: cached.eventUrl }),
    };
  }

  const token = process.env.EVENTBRITE_PRIVATE_TOKEN;
  const eventId = process.env.EVENTBRITE_EVENT_ID;

  if (!token || !eventId) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server configuration error' }),
    };
  }

  try {
    // 1. Resolve the next upcoming occurrence (handles recurring series)
    const { eventId: targetId, eventUrl } = await resolveNextOccurrence(eventId, token);

    // 2. Fetch ticket classes for that specific occurrence
    const data = await ebFetch<EventbriteTicketResponse>(
      `/events/${targetId}/ticket_classes/`,
      token,
    );

    const tickets = sortTickets(
      data.ticket_classes.map((tc) => normalizeTicket(tc, eventUrl)),
    );

    cache = { tickets, eventUrl, timestamp: Date.now() };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ tickets, eventUrl }),
    };
  } catch (err) {
    // Log for Netlify function logs (never reaches the browser)
    console.error('Eventbrite API error:', err);

    const message = err instanceof Error ? err.message : 'Unknown error';
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: 'Unable to fetch ticket data', debug: message }),
    };
  }
};
