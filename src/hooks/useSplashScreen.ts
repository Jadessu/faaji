import { useState, useEffect } from 'react';

interface UseSplashScreenOptions {
  duration?: number;
  fadeOutDuration?: number;
}

interface UseSplashScreenReturn {
  isVisible: boolean;
  isFadingOut: boolean;
  isComplete: boolean;
}

export function useSplashScreen(options: UseSplashScreenOptions = {}): UseSplashScreenReturn {
  const { duration = 2500, fadeOutDuration = 800 } = options;

  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start fade out after duration
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, duration);

    // Hide completely after fade out
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setIsComplete(true);
    }, duration + fadeOutDuration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, fadeOutDuration]);

  return { isVisible, isFadingOut, isComplete };
}
