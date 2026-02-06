import { Link, useLocation } from 'react-router-dom';

const TICKET_URL =
  'https://www.eventbrite.com/e/faaji-fridays-tickets-1981388283694?aff=ebdsshcopyurl&utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=organizer-profile&utm-share-source=organizer-profile';

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
      <a
        href={TICKET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="desktop-nav-link"
      >
        Tickets
      </a>
      <Link
        to="/bottles"
        className={`desktop-nav-link ${pathname === '/bottles' ? 'desktop-nav-link--active' : ''}`}
      >
        Bottles
      </Link>
    </nav>
  );
}
