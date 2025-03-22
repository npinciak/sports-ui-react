export const PLAYER_TRANSACTION_AVAILABILITY_STATUS = {
  FreeAgent: 'FREEAGENT',
  Waivers: 'WAIVERS',
  OnTeam: 'ONTEAM',
} as const;

export const PLAYER_TRANSACTION_AVAILABILITY_FILTER: { value: string; label: string }[] = [
  { value: PLAYER_TRANSACTION_AVAILABILITY_STATUS.FreeAgent, label: 'Free Agents' },
  { value: PLAYER_TRANSACTION_AVAILABILITY_STATUS.Waivers, label: 'Waivers' },
  { value: PLAYER_TRANSACTION_AVAILABILITY_STATUS.OnTeam, label: 'On Team' },
];

export type IClientPlayerTransactionAvailabilityStatus =
  (typeof PLAYER_TRANSACTION_AVAILABILITY_STATUS)[keyof typeof PLAYER_TRANSACTION_AVAILABILITY_STATUS];
