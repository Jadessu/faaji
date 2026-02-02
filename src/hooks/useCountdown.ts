import { useState, useEffect } from 'react';

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface UseCountdownOptions {
  targetDay?: number; // 0 = Sunday, 5 = Friday
  targetHour?: number; // 0-23
}

function getNextFriday(targetDay: number, targetHour: number): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Calculate days until target day
  let daysUntilTarget = (targetDay - dayOfWeek + 7) % 7;

  // Create target date
  const nextTarget = new Date(now);
  nextTarget.setDate(now.getDate() + daysUntilTarget);
  nextTarget.setHours(targetHour, 0, 0, 0);

  // If target time has passed, move to next week
  if (nextTarget <= now) {
    nextTarget.setDate(nextTarget.getDate() + 7);
  }

  return nextTarget;
}

export function useCountdown(options: UseCountdownOptions = {}): CountdownTime {
  const { targetDay = 5, targetHour = 22 } = options; // Default: Friday at 10 PM

  const [countdown, setCountdown] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const nextFriday = getNextFriday(targetDay, targetHour);
      const diff = nextFriday.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDay, targetHour]);

  return countdown;
}
