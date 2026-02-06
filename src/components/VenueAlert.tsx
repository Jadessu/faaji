import { useState } from 'react';
import basslineLogo from '../assets/bassline.png';

export function VenueAlert() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="venue-alert-backdrop" role="alertdialog" aria-modal="true" aria-label="Important venue change notice">
      <div className="venue-alert">
        <div className="venue-alert-badge">VENUE &amp; TIME CHANGE</div>

        <h2 className="venue-alert-title">Tonight's Location &amp; Time Have Changed</h2>

        <img
          src={basslineLogo}
          alt="Bassline logo"
          className="venue-alert-logo"
        />

        <div className="venue-alert-details">
          <p className="venue-alert-address">
            2239 S Michigan Ave<br />
            Chicago, IL 60616
          </p>
        </div>

        <div className="venue-alert-time">
          <p className="venue-alert-time-label">New Time</p>
          <p className="venue-alert-time-value">9:00 PM — 2:00 AM</p>
        </div>

        <p className="venue-alert-note">
          Please update your plans accordingly. Early arrival is strongly encouraged. We look forward to seeing you tonight!
        </p>

        <button
          className="venue-alert-btn"
          onClick={() => setDismissed(true)}
          autoFocus
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
