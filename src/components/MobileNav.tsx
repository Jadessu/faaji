import { Link, useLocation } from 'react-router-dom';
import { HIDE_MISSION } from '../main';

const TICKET_URL =
  'https://www.eventbrite.com/e/faaji-fridays-tickets-1981388283694?aff=ebdsshcopyurl&utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=organizer-profile&utm-share-source=organizer-profile';

export function MobileNav() {
  const { pathname } = useLocation();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <Link
        to="/"
        className={`mobile-nav-item ${pathname === '/' ? 'mobile-nav-item--active' : ''}`}
      >
        <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="mobile-nav-label">Home</span>
      </Link>

      <a
        href={TICKET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-nav-item"
      >
        <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
        <span className="mobile-nav-label">Tickets</span>
      </a>

      <Link
        to="/bottles"
        className={`mobile-nav-item ${pathname === '/bottles' ? 'mobile-nav-item--active' : ''}`}
      >
        <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2h8" />
          <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.789V2" />
        </svg>
        <span className="mobile-nav-label">Bottles</span>
      </Link>

      {!HIDE_MISSION && (
        <Link
          to="/mission"
          className={`mobile-nav-item ${pathname === '/mission' ? 'mobile-nav-item--active' : ''}`}
        >
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span className="mobile-nav-label">Mission</span>
        </Link>
      )}
    </nav>
  );
}
