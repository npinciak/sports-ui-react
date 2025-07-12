import { WidgetCard } from '@shared/components/widget-card.component';
import { useEffect, useState } from 'react';
import { CountdownTimer } from '../../components/freeagent-countdown.component';
import { EspnDateHelper } from '../../fastcast/helpers/espn-date-helper';
import { BaseballEvent } from '../models/baseball-event.model';

export function BaseballTransactionsLockWidget({
  event,
}: {
  event: BaseballEvent;
}) {
  const [time, setTime] = useState<string>('');
  const [firstEventDate, setFirstEventDate] = useState<number>(0);

  useEffect(() => {
    // Only calculate these values once when the component mounts
    // or when the event prop changes
    const startTime = new EspnDateHelper().tickerDate(event.timestamp);
    const firstEventDate = event.timestamp;
    
    setFirstEventDate(firstEventDate);
    setTime(startTime);
  }, [event.timestamp]); // Only depend on event.timestamp

  return (
    <WidgetCard
      title="Transactions lock, in"
      value={<CountdownTimer targetDate={firstEventDate} />}
    >
      {event.competitors.away.abbreviation} vs{' '}
      {event.competitors.home.abbreviation} at {time}
    </WidgetCard>
  );
}