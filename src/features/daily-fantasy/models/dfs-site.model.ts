export const DFS_SITES = {
  DraftKings: 'draftkings',
  FanDuel: 'fanduel',
  Yahoo: 'yahoo',
  OwnersBox: 'ownersbox',
} as const;

export type DfsSite = (typeof DFS_SITES)[keyof typeof DFS_SITES];
