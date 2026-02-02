import { useState, useEffect } from 'react';

interface UseEventFlyerOptions {
  currentFlyer: string;
  placeholderFlyer: string;
  flyerEventDate: Date | null; // The Friday date this flyer is for, null = always show placeholder
}

/**
 * Hook to automatically switch between event flyer and placeholder
 * based on whether the event date has passed.
 *
 * Usage:
 * 1. When you upload a new flyer, set FLYER_EVENT_DATE to the Friday it's for
 * 2. After that Friday at 10 PM passes, it auto-switches to placeholder
 * 3. Set FLYER_EVENT_DATE to null to always show placeholder
 */
export function useEventFlyer({
  currentFlyer,
  placeholderFlyer,
  flyerEventDate,
}: UseEventFlyerOptions): { flyer: string; isPlaceholder: boolean } {
  const [isPlaceholder, setIsPlaceholder] = useState(() => {
    if (!flyerEventDate) return true;

    // Check if the event date (Friday 10 PM) has passed
    const eventTime = new Date(flyerEventDate);
    eventTime.setHours(22, 0, 0, 0); // 10 PM
    return new Date() > eventTime;
  });

  useEffect(() => {
    if (!flyerEventDate) {
      setIsPlaceholder(true);
      return;
    }

    const checkFlyerStatus = () => {
      const eventTime = new Date(flyerEventDate);
      eventTime.setHours(22, 0, 0, 0); // 10 PM
      const now = new Date();
      setIsPlaceholder(now > eventTime);
    };

    // Check immediately
    checkFlyerStatus();

    // Check every minute (in case page is left open during event)
    const interval = setInterval(checkFlyerStatus, 60000);

    return () => clearInterval(interval);
  }, [flyerEventDate]);

  return {
    flyer: isPlaceholder ? placeholderFlyer : currentFlyer,
    isPlaceholder,
  };
}
