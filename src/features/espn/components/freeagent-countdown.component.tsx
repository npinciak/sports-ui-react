import { LockClock } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export function CountdownTimer({ targetDate }: { targetDate: number }) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = new Date(targetDate) - now;

      if (difference <= 0) {
        // Target date has passed
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(intervalId);
        return;
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Initial calculation
    calculateTimeRemaining();

    // Update every second
    intervalId = setInterval(calculateTimeRemaining, 1000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [targetDate]);

  const isExpired =
    timeRemaining.hours === 0 &&
    timeRemaining.minutes === 0 &&
    timeRemaining.seconds === 0;

  return isExpired ? (
    <>
      <LockClock />
    </>
  ) : (
    <div className="countdown-values">
      {/* <span>{timeRemaining.days} days, </span> */}
      <span>{timeRemaining?.hours} h, </span>
      <span>{timeRemaining?.minutes} m, </span>
      <span>{timeRemaining?.seconds} s</span>
    </div>
  );
}
