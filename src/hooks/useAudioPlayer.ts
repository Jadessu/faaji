import { useState, useRef, useEffect, useCallback } from 'react';

interface UseAudioPlayerOptions {
  src: string;
  volume?: number;
  startTime?: number;
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

interface UseAudioPlayerReturn {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  toggle: () => void;
}

export function useAudioPlayer(options: UseAudioPlayerOptions): UseAudioPlayerReturn {
  const { src, volume = 0.2, startTime = 18, autoPlay = true, autoPlayDelay = 2600 } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      audio.currentTime = startTime;
    };
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    async function tryAutoplay() {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }

    let delayTimer: ReturnType<typeof setTimeout> | undefined;
    let interactionHandler: (() => void) | undefined;

    if (autoPlay) {
      delayTimer = setTimeout(tryAutoplay, autoPlayDelay);

      // Fallback: try on first user interaction if delayed autoplay failed
      interactionHandler = () => {
        if (audio.paused) tryAutoplay();
      };
      document.addEventListener('click', interactionHandler, { once: true });
      document.addEventListener('touchstart', interactionHandler, { once: true });
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      clearTimeout(delayTimer);
      if (interactionHandler) {
        document.removeEventListener('click', interactionHandler);
        document.removeEventListener('touchstart', interactionHandler);
      }
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src, volume, startTime, autoPlay, autoPlayDelay]);

  return { audioRef, isPlaying, toggle };
}
