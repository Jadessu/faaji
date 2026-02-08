import { Link, useLocation } from 'react-router-dom';
import { HIDE_MISSION, HIDE_TICKETS_PAGE, TICKET_URL } from '../main';

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      <Link
        to="/"
        className={`desktop-nav-link ${pathname === '/' ? 'desktop-nav-link--active' : ''}`}
      >
        Home
      </Link>
      {HIDE_TICKETS_PAGE ? (
        <a
          href={TICKET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="desktop-nav-link"
        >
          Tickets
        </a>
      ) : (
        <Link
          to="/tickets"
          className={`desktop-nav-link ${pathname === '/tickets' ? 'desktop-nav-link--active' : ''}`}
        >
          Tickets
        </Link>
      )}
      <Link
        to="/bottles"
        className={`desktop-nav-link ${pathname === '/bottles' ? 'desktop-nav-link--active' : ''}`}
      >
        Bottles
      </Link>
      {!HIDE_MISSION && (
        <Link
          to="/mission"
          className={`desktop-nav-link ${pathname === '/mission' ? 'desktop-nav-link--active' : ''}`}
        >
          Our Mission
        </Link>
      )}
    </nav>
  );
}
