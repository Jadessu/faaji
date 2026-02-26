import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { SplashScreen } from './components/SplashScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { Countdown } from './components/Countdown';
import { CTAButton } from './components/CTAButton';
import { FlyerCard } from './components/FlyerCard';
import { LocationSection } from './components/LocationSection';
import { MobileNav } from './components/MobileNav';
import { UpcomingEvents } from './components/UpcomingEvents';
import { Navbar } from './components/Navbar';
import { SEO } from './components/SEO';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import flyerImage from './assets/images/faajiFlyer.png';
import kdbdFlyer from './assets/images/KDBD.png';
import audioSrc from './assets/audio/Soweto.mp3';

import './styles/global.css';
import './styles/animations.css';
import './App.css';

const TICKET_URL =
  'https://www.eventbrite.com/e/faaji-fridays-tickets-1981388283694?aff=ebdsshcopyurl&utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=organizer-profile&utm-share-source=organizer-profile';

const VENUE = {
  name: 'VLive Chicago',
  streetAddress: '2501 S Kedzie Ave',
  city: 'Chicago',
  state: 'IL',
  postalCode: '60623',
};

function App() {
  const { isPlaying, toggle } = useAudioPlayer({
    src: audioSrc,
    volume: 0.2,
    startTime: 0,
    autoPlay: true,
    autoPlayDelay: 0,
  });
  const [duoActive, setDuoActive] = useState(0);
  const duoMounted = useRef(false);

  useEffect(() => {
    if (!duoMounted.current) { duoMounted.current = true; return; }
    if (duoActive !== 1) return;

    const colors = ['#f87dac', '#d4a853', '#b57bee', '#f9e04b', '#7bcef8'];
    const shared = { colors, ticks: 120, startVelocity: 28, gravity: 0.9, scalar: 0.9 };

    confetti({ ...shared, particleCount: 60, angle: 60, spread: 70, origin: { x: 0, y: 0.65 } });
    confetti({ ...shared, particleCount: 60, angle: 120, spread: 70, origin: { x: 1, y: 0.65 } });

    setTimeout(() => {
      confetti({ ...shared, particleCount: 30, angle: 90, spread: 50, origin: { x: 0.5, y: 0.5 } });
    }, 200);
  }, [duoActive]);

  return (
    <>
      <SEO />
      <SplashScreen />

      {/* Mobile video background */}
      <div className="mobile-video-bg">
        <video autoPlay muted loop playsInline>
          <source src="https://pub-c076e6f3de96493b93e7e67b250b61c0.r2.dev/Faajis.mp4" type="video/mp4" />
        </video>
        <div className="mobile-video-overlay"></div>
      </div>

      {/* Animated gradient background */}
      <div className="gradient-bg">
        <div className="gradient-blob gradient-blob--gold"></div>
        <div className="gradient-blob gradient-blob--blue"></div>
        <div className="gradient-blob gradient-blob--gold-2"></div>
        <div className="gradient-blob gradient-blob--blue-2"></div>
      </div>

      <div className="ambient-glow"></div>

      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-info">
            <span className="every-friday">
              Every <span className="friday-white">Friday</span> Night
            </span>
            <h1 className="event-title">FAAJI</h1>

            <Countdown />

            <CTAButton href={TICKET_URL}>Get Tickets</CTAButton>
          </div>

          <div className="hero-flyer">
            {/* Desktop: main flyer + also-tonight strip */}
            <div className="hero-flyer-main">
              <FlyerCard
                imageSrc={flyerImage}
                imageAlt="FAAJI Event Flyer - Every Friday Night at Bassline Chicago"
              >
                <AudioPlayer isPlaying={isPlaying} onToggle={toggle} />
              </FlyerCard>

              <div className="also-tonight">
                <img src={kdbdFlyer} alt="Birthday Celebration Flyer" className="also-tonight-thumb" />
                <div className="also-tonight-text">
                  <span className="also-tonight-label">Also Tonight</span>
                  <span className="also-tonight-title">Khayd Birthday Celebration</span>
                </div>
              </div>
            </div>

            {/* Mobile: two-flyer depth duo */}
            <div className="flyer-duo">
              <div className="flyer-duo-track">
                <div
                  className={`flyer-duo-item ${duoActive === 0 ? 'flyer-duo-item--active' : 'flyer-duo-item--peek-left'}`}
                  onClick={() => setDuoActive(0)}
                >
                  <img src={flyerImage} alt="FAAJI Event Flyer" />
                  <div className="flyer-duo-audio" onClick={e => e.stopPropagation()}>
                    <AudioPlayer isPlaying={isPlaying} onToggle={toggle} />
                  </div>
                </div>
                <div
                  className={`flyer-duo-item ${duoActive === 1 ? 'flyer-duo-item--active' : 'flyer-duo-item--peek-right'}`}
                  onClick={() => setDuoActive(1)}
                >
                  <img src={kdbdFlyer} alt="Birthday Celebration Flyer" />
                </div>
              </div>
              <p className="flyer-duo-label">
                {duoActive === 0 ? 'Faaji Fridays' : 'Khayd Birthday Celebration'}
              </p>
            </div>

            <LocationSection venue={VENUE} isMobile />

            <CTAButton href={TICKET_URL} className="mobile-cta">
              Get Tickets
            </CTAButton>
          </div>
        </section>

        <UpcomingEvents />

        <LocationSection venue={VENUE} />
      </main>

      <MobileNav />
    </>
  );
}

export default App;
