import { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { MobileNav } from '../components/MobileNav';
import { Navbar } from '../components/Navbar';
import flyerImage from '../assets/images/faajiFlyer.jpg';
import '../styles/tickets.css';

interface Ticket {
  id: string;
  name: string;
  price: string;
  isFree: boolean;
  isSoldOut: boolean;
  salesEnd: string | null;
  checkoutUrl: string;
}

/**
 * Fetches ticket data from our internal API only.
 * The browser never contacts Eventbrite directly — the serverless
 * function handles that and returns only safe, normalized data.
 */
const TICKETS_API = '/api/tickets';

const EVENTBRITE_FALLBACK =
  'https://www.eventbrite.com/e/faaji-fridays-tickets-1981388283694';

export function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [eventUrl, setEventUrl] = useState(EVENTBRITE_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(TICKETS_API);
        if (!res.ok) throw new Error('Failed to load tickets');
        const data = await res.json();
        if (!cancelled) {
          setTickets(data.tickets);
          if (data.eventUrl) setEventUrl(data.eventUrl);
        }
      } catch {
        if (!cancelled) setError('Unable to load tickets right now. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <SEO />

      {/* Background elements */}
      <div className="gradient-bg">
        <div className="gradient-blob gradient-blob--gold"></div>
        <div className="gradient-blob gradient-blob--blue"></div>
        <div className="gradient-blob gradient-blob--gold-2"></div>
        <div className="gradient-blob gradient-blob--blue-2"></div>
      </div>
      <div className="ambient-glow"></div>

      <Navbar />

      <div className="tickets-page">
        <header className="tickets-header">
          <span className="tickets-subtitle">Faaji Fridays</span>
          <h1 className="tickets-title">Tickets</h1>
          <div className="tickets-divider"></div>
        </header>

        {loading && (
          <div className="tickets-loading">
            <div className="tickets-spinner"></div>
            <p>Loading tickets…</p>
          </div>
        )}

        {error && (
          <div className="tickets-error">
            <p>{error}</p>
            <a
              href={eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tickets-fallback-link"
            >
              View tickets on Eventbrite
            </a>
          </div>
        )}

        {!loading && !error && tickets.length === 0 && (
          <div className="tickets-empty">
            <p>No tickets available at the moment.</p>
          </div>
        )}

        {!loading && !error && tickets.length > 0 && (
          <div className="tickets-grid">
            {tickets.map((ticket, i) => (
              <div
                key={ticket.id}
                className={`ticket-card ${ticket.isSoldOut ? 'ticket-card--sold-out' : ''}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="ticket-card-inner">
                  <div className="ticket-card-glow"></div>

                  <div className="ticket-card-image">
                    <img src={flyerImage} alt="Faaji Fridays" />
                  </div>

                  <div className="ticket-card-body">
                    <div className="ticket-info">
                      <span className="ticket-name">{ticket.name}</span>
                      <span className="ticket-price">{ticket.price}</span>
                    </div>

                    <div className="ticket-status">
                      {ticket.isSoldOut ? (
                        <span className="ticket-badge ticket-badge--sold-out">Sold Out</span>
                      ) : ticket.isFree ? (
                        <span className="ticket-badge ticket-badge--free">Free</span>
                      ) : (
                        <span className="ticket-badge ticket-badge--available">Available</span>
                      )}
                    </div>

                    {ticket.isSoldOut ? (
                      <span className="ticket-btn ticket-btn--disabled">Sold Out</span>
                    ) : (
                      <a
                        href={ticket.checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ticket-btn"
                      >
                        Get Tickets
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="tickets-footer">
          <p>
            Tickets are sold through Eventbrite. Prices and availability may change.
          </p>
        </footer>
      </div>

      <MobileNav />
    </>
  );
}
