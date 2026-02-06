import { SplashScreen } from './components/SplashScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { Countdown } from './components/Countdown';
import { CTAButton } from './components/CTAButton';
import { FlyerCard } from './components/FlyerCard';
import { LocationSection } from './components/LocationSection';
import { MobileNav } from './components/MobileNav';
import { Navbar } from './components/Navbar';
import { VenueAlert } from './components/VenueAlert';
import { SEO } from './components/SEO';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import flyerImage from './assets/images/faajiFlyer.jpg';
import audioSrc from './assets/audio/alaye.mp3';

import './styles/global.css';
import './styles/animations.css';
import './App.css';

const TICKET_URL =
  'https://www.eventbrite.com/e/faaji-fridays-tickets-1981388283694?aff=ebdsshcopyurl&utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=organizer-profile&utm-share-source=organizer-profile';

const VENUE = {
  name: 'Bassline',
  streetAddress: '2239 S Michigan Ave',
  city: 'Chicago',
  state: 'IL',
  postalCode: '60616',
};

function App() {
  const { isPlaying, toggle } = useAudioPlayer({
    src: audioSrc,
    volume: 0.2,
    startTime: 18,
    autoPlay: true,
  });

  return (
    <>
      <SEO />
      <SplashScreen />
      <VenueAlert />

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
            <FlyerCard
              imageSrc={flyerImage}
              imageAlt="FAAJI Event Flyer - Every Friday Night at Bassline Chicago"
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

      <MobileNav />
    </>
  );
}

export default App;
