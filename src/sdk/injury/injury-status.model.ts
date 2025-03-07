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

export const INJURY_STATUS_LIST = [
  PLAYER_INJURY_STATUS.O,
  PLAYER_INJURY_STATUS.IR,
  PLAYER_INJURY_STATUS.DL7,
  PLAYER_INJURY_STATUS.DL10,
  PLAYER_INJURY_STATUS.DL15,
  PLAYER_INJURY_STATUS.DL60,
  PLAYER_INJURY_STATUS.Brv,
  PLAYER_INJURY_STATUS.Pat,
];

export const INJURY_LABEL_BY_INJURY_STATUS: { [key in PlayerInjuryStatus]: string } = {
  [PLAYER_INJURY_STATUS.Active]: 'Active',
  [PLAYER_INJURY_STATUS.Probable]: 'Probable',
  [PLAYER_INJURY_STATUS.Ques]: 'Questionable',
  [PLAYER_INJURY_STATUS.NotStarting]: 'Not Starting',
  [PLAYER_INJURY_STATUS.Starting]: 'Starting',
  [PLAYER_INJURY_STATUS.D]: 'Doubtful',
  [PLAYER_INJURY_STATUS.O]: 'Out',
  [PLAYER_INJURY_STATUS.IR]: 'Injury Reserve',
  [PLAYER_INJURY_STATUS.DTD]: 'Day to Day',
  [PLAYER_INJURY_STATUS.DL7]: '7 Day DL',
  [PLAYER_INJURY_STATUS.DL10]: '10 Day DL',
  [PLAYER_INJURY_STATUS.DL15]: '15 Day DL',
  [PLAYER_INJURY_STATUS.DL60]: '60 Day DL',
  [PLAYER_INJURY_STATUS.Brv]: 'Bereavement',
  [PLAYER_INJURY_STATUS.Pat]: 'Paternity',
  [PLAYER_INJURY_STATUS.SUS]: 'Suspension',
  [PLAYER_INJURY_STATUS.UNKNOWN]: 'Unknown',
} as const;

export type PlayerInjuryStatus = typeof PLAYER_INJURY_STATUS[keyof typeof PLAYER_INJURY_STATUS];
