export const PLAYER_INJURY_STATUS = {
  Active: 'ACTIVE',
  Probable: 'PROBABLE',
  Ques: 'QUESTIONABLE',
  NotStarting: 'NOTSTARTING',
  Starting: 'STARTING',
  D: 'DOUBTFUL',
  O: 'OUT',
  IR: 'INJURY_RESERVE',
  DTD: 'DAY_TO_DAY',
  DL7: 'SEVEN_DAY_DL',
  DL10: 'TEN_DAY_DL',
  DL15: 'FIFTEEN_DAY_DL',
  DL60: 'SIXTY_DAY_DL',
  Brv: 'BEREAVEMENT',
  Pat: 'PATERNITY',
  SUS: 'SUSPENSION',
  UNKNOWN: 'UNKNOWN',
} as const;

export const PLAYER_COMPETITION_STATUS = {
  Active: 'ACTIVE',
  Probable: 'PROBABLE',
  Ques: 'QUESTIONABLE',
  NotStarting: 'NOTSTARTING',
  Starting: 'STARTING',
  D: 'DOUBTFUL',
  O: 'OUT',
  IR: 'INJURY_RESERVE',
  DTD: 'DAY_TO_DAY',
  DL7: 'SEVEN_DAY_DL',
  DL10: 'TEN_DAY_DL',
  DL15: 'FIFTEEN_DAY_DL',
  DL60: 'SIXTY_DAY_DL',
  Brv: 'BEREAVEMENT',
  Pat: 'PATERNITY',
  SUS: 'SUSPENSION',
  UNKNOWN: 'UNKNOWN',
} as const;

export const INJURY_STATUS_LIST = [
  PLAYER_COMPETITION_STATUS.IR,
  PLAYER_COMPETITION_STATUS.DL7,
  PLAYER_COMPETITION_STATUS.DL10,
  PLAYER_COMPETITION_STATUS.DL15,
  PLAYER_COMPETITION_STATUS.DL60,
];

export const PLAYER_COMPETITION_STATUS_LABEL_BY_PLAYER_COMPETITION_STATUS: { [key in PlayerCompetitionStatus]: string } = {
  [PLAYER_COMPETITION_STATUS.Active]: 'Active',
  [PLAYER_COMPETITION_STATUS.Probable]: 'Probable',
  [PLAYER_COMPETITION_STATUS.Ques]: 'Questionable',
  [PLAYER_COMPETITION_STATUS.NotStarting]: 'Not Starting',
  [PLAYER_COMPETITION_STATUS.Starting]: 'Starting',
  [PLAYER_COMPETITION_STATUS.D]: 'Doubtful',
  [PLAYER_COMPETITION_STATUS.O]: 'Out',
  [PLAYER_COMPETITION_STATUS.IR]: 'Injury Reserve',
  [PLAYER_COMPETITION_STATUS.DTD]: 'Day to Day',
  [PLAYER_COMPETITION_STATUS.DL7]: '7 Day DL',
  [PLAYER_COMPETITION_STATUS.DL10]: '10 Day DL',
  [PLAYER_COMPETITION_STATUS.DL15]: '15 Day DL',
  [PLAYER_COMPETITION_STATUS.DL60]: '60 Day DL',
  [PLAYER_COMPETITION_STATUS.Brv]: 'Bereavement',
  [PLAYER_COMPETITION_STATUS.Pat]: 'Paternity',
  [PLAYER_COMPETITION_STATUS.SUS]: 'Suspension',
  [PLAYER_COMPETITION_STATUS.UNKNOWN]: 'Unknown',
} as const;

export type PlayerCompetitionStatus = (typeof PLAYER_COMPETITION_STATUS)[keyof typeof PLAYER_COMPETITION_STATUS];
