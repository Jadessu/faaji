interface Venue {
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

interface LocationSectionProps {
  venue: Venue;
  isMobile?: boolean;
}

export function LocationSection({ venue, isMobile = false }: LocationSectionProps) {
  if (isMobile) {
    return (
      <div className="mobile-location">
        <p className="location-label">Location</p>
        <h3 className="venue-name">{venue.name}</h3>
        <p className="venue-address">
          {venue.streetAddress}
          <br />
          {venue.city}, {venue.state} {venue.postalCode}
        </p>
      </div>
    );
  }

  return (
    <section className="location-section">
      <div className="location-content">
        <div>
          <p className="location-label">Location</p>
          <h3 className="venue-name">{venue.name}</h3>
          <p className="venue-address">
            {venue.streetAddress}
            <br />
            {venue.city}, {venue.state} {venue.postalCode}
          </p>
        </div>
      </div>
      <p className="footer-text">FAAJI &copy; 2025</p>
    </section>
  );
}
