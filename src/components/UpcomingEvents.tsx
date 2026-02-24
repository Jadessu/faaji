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
  if (EVENTS.length === 0) return null;

  return (
    <section className="upcoming-events">
      <div className="upcoming-section-header">
        <p className="upcoming-section-label">On The Horizon</p>
        <h2 className="upcoming-section-title">Upcoming Special Events</h2>
      </div>

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
    </section>
  );
}
