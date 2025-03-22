import { ClientEventStatusType } from '@sdk/espn-client-models/event-status.model';

export interface IFullStatusEntity {
  type: IFullStatus;
}

export interface IFullStatus {
  id: ClientEventStatusType;
  name: string;
  state: string;
  completed: boolean;
}
