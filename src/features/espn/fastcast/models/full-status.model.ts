import { EventStatusType } from 'sports-ui-sdk/src/lib/espn-client/models/event-status.model';

export interface IFullStatusEntity {
  type: IFullStatus;
}

export interface IFullStatus {
  id: EventStatusType;
  name: string;
  state: string;
  completed: boolean;
}
