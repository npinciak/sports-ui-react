import { ClientEventStatus } from '@sdk/espn-client-models/event-status.model';
import { ClientSeasonType } from '@sdk/espn-client-models/season-type.model';

export type EventSummaryBySeasonTypeByEventStatus = {
  [key in ClientSeasonType]: {
    [key in ClientEventStatus]: string | null;
  };
};
