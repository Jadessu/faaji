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

  const tryAutoplay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Autoplay prevented, user interaction required:', error);
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.log('Audio playback failed:', error);
          setIsPlaying(false);
        });
    }
  }, [isPlaying]);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Set start time when metadata is loaded
    const handleLoadedMetadata = () => {
      audio.currentTime = startTime;
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Handle autoplay
    if (autoPlay) {
      // Try autoplay immediately or after a delay
      const delayedAutoplay = setTimeout(() => {
        tryAutoplay();
      }, autoPlayDelay);

      // Fallback: try on first user interaction
      const startOnInteraction = () => {
        if (!audioRef.current?.paused === false) {
          tryAutoplay();
        }
      };

      document.addEventListener('click', startOnInteraction, { once: true });
      document.addEventListener('touchstart', startOnInteraction, { once: true });

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        clearTimeout(delayedAutoplay);
        document.removeEventListener('click', startOnInteraction);
        document.removeEventListener('touchstart', startOnInteraction);
        audio.pause();
        audio.src = '';
      };
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.pause();
      audio.src = '';
    };
  }, [src, volume, startTime, autoPlay, autoPlayDelay, tryAutoplay]);

  return { audioRef, isPlaying, toggle };
}
