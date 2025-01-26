import { EventStatus, SeasonType } from 'sports-ui-sdk';

export type EventSummaryBySeasonTypeByEventStatus = {
  [key in SeasonType]: {
    [key in EventStatus]: string | null;
  };
};
