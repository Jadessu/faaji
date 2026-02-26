import { useState } from 'react';
import ghanaFlyer from '../assets/images/Ghana.png';
import stPatrickFlyer from '../assets/images/stpatrick.jpg';

interface UpcomingEvent {
  flyer: string;
  alt: string;
  label: string;
  date: string;
  title: string;
  ticketUrl?: string;
}

const EVENTS: UpcomingEvent[] = [
  {
    flyer: ghanaFlyer,
    alt: 'Ghana Independence Day Party Flyer',
    label: 'Special Event',
    date: 'March 6',
    title: 'Ghana Independence Day',
    ticketUrl: undefined,
  },
  {
    flyer: stPatrickFlyer,
    alt: "St. Patrick's Day Party Flyer",
    label: 'Special Event',
    date: 'March 13',
    title: "St. Patrick's Day",
    ticketUrl: undefined,
  },
];

export function UpcomingEvents() {
  const [activeIndex, setActiveIndex] = useState(0);

  if (EVENTS.length === 0) return null;

  const prev = () => setActiveIndex(i => (i - 1 + EVENTS.length) % EVENTS.length);
  const next = () => setActiveIndex(i => (i + 1) % EVENTS.length);

  function getSlideState(i: number): 'active' | 'prev' | 'next' | 'hidden' {
    if (i === activeIndex) return 'active';
    if (i === (activeIndex - 1 + EVENTS.length) % EVENTS.length) return 'prev';
    if (i === (activeIndex + 1) % EVENTS.length) return 'next';
    return 'hidden';
  }

  const active = EVENTS[activeIndex];

  return (
    <section className="upcoming-events">
      <div className="upcoming-section-header">
        <p className="upcoming-section-label">On The Horizon</p>
        <h2 className="upcoming-section-title">Upcoming Special Events</h2>
      </div>

      {/* Desktop: side-by-side cards */}
      <div className="upcoming-grid">
        {EVENTS.map((event) => (
          <div className="upcoming-card" key={event.title}>
            {event.ticketUrl ? (
              <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="upcoming-flyer-frame">
                <img src={event.flyer} alt={event.alt} className="upcoming-flyer-img" />
              </a>
            ) : (
              <div className="upcoming-flyer-frame">
                <img src={event.flyer} alt={event.alt} className="upcoming-flyer-img" />
              </div>
            )}
            <div className="upcoming-card-info">
              <p className="upcoming-card-label">{event.label}</p>
              <p className="upcoming-card-date">{event.date}</p>
              <h3 className="upcoming-card-title">{event.title}</h3>
              {event.ticketUrl && (
                <a href={event.ticketUrl} className="upcoming-card-btn">
                  Get Tickets
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: depth slider */}
      <div className="upcoming-slider">
        <button
          className="upcoming-slider-arrow upcoming-slider-arrow--prev"
          onClick={prev}
          aria-label="Previous event"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="upcoming-slider-track">
          {EVENTS.map((event, i) => {
            const state = getSlideState(i);
            if (state === 'hidden') return null;
            return (
              <div
                key={event.title}
                className={`upcoming-slide upcoming-slide--${state}`}
                onClick={() => {
                  if (state === 'prev') prev();
                  else if (state === 'next') next();
                  else if (state === 'active' && event.ticketUrl) window.open(event.ticketUrl, '_blank');
                }}
              >
                <img src={event.flyer} alt={event.alt} className="upcoming-slide-img" />
              </div>
            );
          })}
        </div>

        <button
          className="upcoming-slider-arrow upcoming-slider-arrow--next"
          onClick={next}
          aria-label="Next event"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Info below the active slide */}
        <div className="upcoming-slider-info">
          <p className="upcoming-card-label">{active.label}</p>
          <p className="upcoming-card-date">{active.date}</p>
          <h3 className="upcoming-card-title">{active.title}</h3>
          {active.ticketUrl && (
            <a href={active.ticketUrl} target="_blank" rel="noopener noreferrer" className="upcoming-card-btn">
              Get Tickets
            </a>
          )}
        </div>

        {EVENTS.length > 1 && (
          <p className="upcoming-slider-counter">{activeIndex + 1} / {EVENTS.length}</p>
        )}
      </div>
    </section>
  );
}
