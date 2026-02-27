import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  targetDay?: number;
  targetHour?: number;
  targetDate?: Date;
}

export function Countdown({ targetDay = 5, targetHour = 23, targetDate }: CountdownProps) {
  const { days, hours, minutes, seconds } = useCountdown({ targetDay, targetHour, targetDate });

  return (
    <div className="countdown">
      <div className="countdown-item">
        <span className="countdown-number">{days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <span className="countdown-divider">:</span>
      <div className="countdown-item">
        <span className="countdown-number">{hours}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <span className="countdown-divider">:</span>
      <div className="countdown-item">
        <span className="countdown-number">{minutes}</span>
        <span className="countdown-label">Minutes</span>
      </div>
      <span className="countdown-divider">:</span>
      <div className="countdown-item">
        <span className="countdown-number">{seconds}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
}
