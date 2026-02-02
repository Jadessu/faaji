import { useSplashScreen } from '../hooks/useSplashScreen';

interface SplashScreenProps {
  duration?: number;
  onComplete?: () => void;
}

export function SplashScreen({ duration = 2500 }: SplashScreenProps) {
  const { isVisible, isFadingOut } = useSplashScreen({ duration });

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="sound-waves">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="splash-text">FAAJI</div>
    </div>
  );
}
