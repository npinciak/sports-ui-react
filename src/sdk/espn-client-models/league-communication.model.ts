export const LEAGUE_COMMUNICATION_TOPIC = {
  Transactions: 'ACTIVITY_TRANSACTIONS',
  Settings: 'ACTIVITY_SETTINGS',
} as const;

export type IClientLeagueCommunication = {
  topics: IClientLeagueCommunicationTopicEntity[];
};

export interface IClientLeagueCommunicationTopicEntity {
  id: string;
  date: number;
  messages: IClientLeagueCommunicationTopicMessageEntity[];
  type: IClientLeagueCommunicationTopic;
}
export interface IClientLeagueCommunicationTopicMessageEntity {
  id: string;
  messageTypeId: number;
  targetId: number;
  topicId: number;
  to: number;
}

export type IClientLeagueCommunicationTopic = (typeof LEAGUE_COMMUNICATION_TOPIC)[keyof typeof LEAGUE_COMMUNICATION_TOPIC];
