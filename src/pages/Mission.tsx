import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { MobileNav } from '../components/MobileNav';
import { Gallery } from '../components/Gallery';
import '../styles/global.css';
import '../styles/animations.css';
import '../App.css';
import '../styles/mission.css';

export function Mission() {
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

      <div className="mission-page">
        <header className="mission-header">
          <span className="mission-subtitle">Who We Are</span>
          <h1 className="mission-title">Our Mission</h1>
          <div className="mission-divider"></div>
        </header>

        <div className="mission-layout">
          <div className="mission-content">
            <p className="mission-lead">
              At Faaji, our mission is simple:<br />
              to create unforgettable nights where culture, music, and community collide.
            </p>

            <p>
              "Faaji" means fun, enjoyment, and celebration, and that spirit is at the heart of
              everything we do. We curate experiences that go beyond just partying — nights that
              feel intentional, inclusive, and alive. From Afrobeats and Amapiano to Hip-Hop and
              global sounds, our events are designed to bring people together through rhythm,
              energy, and shared joy.
            </p>

            <p>
              We exist to give people a space to feel free, feel seen, and feel connected —
              whether you're dancing with friends, meeting new faces, or just letting the music
              carry you.
            </p>

            <p className="mission-about-label">Faaji is about:</p>
            <ul className="mission-list">
              <li>Celebrating African and global culture</li>
              <li>Creating safe, vibrant, and elevated nightlife experiences</li>
              <li>Connecting communities through music and movement</li>
              <li>Turning ordinary nights into memories that last</li>
            </ul>

            {/* <p>
              Every event is thoughtfully crafted — the music, the atmosphere, the crowd, and
              the energy — because we believe nights out should feel special, not repetitive.
            </p> */}

            <p className="mission-closing">
              This isn't just a party.<br />
              <span className="mission-highlight">This is Faaji.</span>
            </p>
          </div>

          {/* Gallery — right column on desktop, below text on mobile */}
          <Gallery />
        </div>
      </div>

      <MobileNav />
    </>
  );
}
