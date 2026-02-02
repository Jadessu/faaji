import { SplashScreen } from './components/SplashScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { Countdown } from './components/Countdown';
import { CTAButton } from './components/CTAButton';
import { FlyerCard } from './components/FlyerCard';
import { LocationSection } from './components/LocationSection';
import { SEO } from './components/SEO';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useEventFlyer } from './hooks/useEventFlyer';

import flyerImage from './assets/images/f1.jpg';
import placeholderImage from './assets/images/placeholderFlyer.jpg';
import audioSrc from './assets/audio/alaye.mp3';

import './styles/global.css';
import './styles/animations.css';
import './App.css';

// =============================================================================
// FLYER CONFIGURATION
// =============================================================================
// Update this date when you upload a new flyer.
// Set to the Friday date that the flyer is for.
// After that Friday at 10 PM, it automatically switches to placeholder.
// Set to null to always show placeholder.
// =============================================================================
const FLYER_EVENT_DATE: Date | null = new Date('2025-01-31'); // Example: Friday Jan 31, 2025
// =============================================================================

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
    startTime: 18,
    autoPlay: true,
  });

  const { flyer } = useEventFlyer({
    currentFlyer: flyerImage,
    placeholderFlyer: placeholderImage,
    flyerEventDate: FLYER_EVENT_DATE,
  });

  return (
    <>
      <SEO />
      <SplashScreen />
      <div className="ambient-glow"></div>

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
            <FlyerCard
              imageSrc={flyer}
              imageAlt="FAAJI Event Flyer - Every Friday Night at VLive Chicago"
            >
              <AudioPlayer isPlaying={isPlaying} onToggle={toggle} />
            </FlyerCard>

            <LocationSection venue={VENUE} isMobile />

            <CTAButton href={TICKET_URL} className="mobile-cta">
              Get Tickets
            </CTAButton>
          </div>
        </section>

        <LocationSection venue={VENUE} />
      </main>
    </>
  );
}

export default App;
