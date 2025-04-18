import { PLAYER_INJURY_STATUS, PlayerCompetitionStatus } from './injury-status.model';

export const enum InjurySeverity {
  Unknown = -1,
  Serious,
  SemiSerious,
  Positive,
}

export type InjurySeverityColor = (typeof INJURY_SEVERITY_COLOR)[keyof typeof INJURY_SEVERITY_COLOR];

export const INJURY_SEVERITY_COLOR = {
  Unknown: null,
  Serious: '#cb0123',
  SemiSerious: '#E8B436',
  Positive: '#267851',
} as const;

export const INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY: { [key in InjurySeverity]: InjurySeverityColor } = {
  [InjurySeverity.Unknown]: INJURY_SEVERITY_COLOR.Positive,
  [InjurySeverity.Serious]: INJURY_SEVERITY_COLOR.Serious,
  [InjurySeverity.SemiSerious]: INJURY_SEVERITY_COLOR.SemiSerious,
  [InjurySeverity.Positive]: INJURY_SEVERITY_COLOR.Positive,
} as const;

export const INJURY_SEVERITY_BY_INJURY_STATUS: { [key in PlayerCompetitionStatus]: InjurySeverity } = {
  [PLAYER_INJURY_STATUS.Active]: InjurySeverity.Positive,
  [PLAYER_INJURY_STATUS.Probable]: InjurySeverity.Positive,
  [PLAYER_INJURY_STATUS.Ques]: InjurySeverity.SemiSerious,
  [PLAYER_INJURY_STATUS.NotStarting]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.Starting]: InjurySeverity.Positive,
  [PLAYER_INJURY_STATUS.D]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.O]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.IR]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.DTD]: InjurySeverity.SemiSerious,
  [PLAYER_INJURY_STATUS.DL7]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.DL10]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.DL15]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.DL60]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.Brv]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.Pat]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.SUS]: InjurySeverity.Serious,
  [PLAYER_INJURY_STATUS.UNKNOWN]: InjurySeverity.Positive,
} as const;

export const INJURY_STATUS_FILTER: { value: boolean | null; label: string }[] = [
  { value: null, label: 'All' },
  { value: false, label: 'Healthy' },
  { value: true, label: 'IL-Eligibile' },
];
