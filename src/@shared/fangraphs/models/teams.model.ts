import { MLB_TEAM_MAP, MlbTeam } from 'sports-ui-sdk';

export const enum FangraphTeam {
  AllTeams,
  Angels,
  Orioles,
  RedSox,
  WhiteSox,
  Guardians,
  Tigers,
  Royals,
  Twins,
  Yankees,
  Athletics,
  Mariners,
  Rays,
  Rangers,
  BlueJays,
  Diamondbacks,
  Braves,
  Cubs,
  Reds,
  Rockies,
  Marlins,
  Astros,
  Dodgers,
  Brewers,
  Nationals,
  Mets,
  Phillies,
  Pirates,
  Cardinals,
  Padres,
  Giants,
}

export const FangraphsTeamList = [
  {
    value: [FangraphTeam.AllTeams],
    label: 'All Teams',
  },
  {
    value: [FangraphTeam.Angels],
    label: 'Angels',
  },
  {
    value: [FangraphTeam.Astros],
    label: 'Astros',
  },
  {
    value: [FangraphTeam.Athletics],
    label: 'Athletics',
  },
  {
    value: [FangraphTeam.BlueJays],
    label: 'Blue Jays',
  },
  {
    value: [FangraphTeam.Braves],
    label: 'Braves',
  },
  {
    value: [FangraphTeam.Brewers],
    label: 'Brewers',
  },
  {
    value: [FangraphTeam.Cardinals],
    label: 'Cardinals',
  },
  {
    value: [FangraphTeam.Cubs],
    label: 'Cubs',
  },
  {
    value: [FangraphTeam.Diamondbacks],
    label: 'Diamondbacks',
  },
  {
    value: [FangraphTeam.Dodgers],
    label: 'Dodgers',
  },
  {
    value: [FangraphTeam.Giants],
    label: 'Giants',
  },
  {
    value: [FangraphTeam.Guardians],
    label: 'Guardians',
  },
  {
    value: [FangraphTeam.Mariners],
    label: 'Mariners',
  },
  {
    value: [FangraphTeam.Marlins],
    label: 'Marlins',
  },
  {
    value: [FangraphTeam.Mets],
    label: 'Mets',
  },
  {
    value: [FangraphTeam.Nationals],
    label: 'Nationals',
  },
  {
    value: [FangraphTeam.Orioles],
    label: 'Orioles',
  },
  {
    value: [FangraphTeam.Padres],
    label: 'Padres',
  },
  {
    value: [FangraphTeam.Phillies],
    label: 'Phillies',
  },
  {
    value: [FangraphTeam.Pirates],
    label: 'Pirates',
  },
  {
    value: [FangraphTeam.Rangers],
    label: 'Rangers',
  },
  {
    value: [FangraphTeam.Rays],
    label: 'Rays',
  },
  {
    value: [FangraphTeam.RedSox],
    label: 'Red Sox',
  },
  {
    value: [FangraphTeam.Reds],
    label: 'Reds',
  },
  {
    value: [FangraphTeam.Rockies],
    label: 'Rockies',
  },
  {
    value: [FangraphTeam.Royals],
    label: 'Royals',
  },
  {
    value: [FangraphTeam.Tigers],
    label: 'Tigers',
  },
  {
    value: [FangraphTeam.Twins],
    label: 'Twins',
  },
  {
    value: [FangraphTeam.WhiteSox],
    label: 'White Sox',
  },
  {
    value: [FangraphTeam.Yankees],
    label: 'Yankees',
  },
];

export const FangraphsTeamToEspnTeam: Record<string, string> = {
  ATL: MLB_TEAM_MAP[MlbTeam.Atl],
  LAD: MLB_TEAM_MAP[MlbTeam.LAD],
  NYY: MLB_TEAM_MAP[MlbTeam.NYY],
  SDP: MLB_TEAM_MAP[MlbTeam.SD],
  BAL: MLB_TEAM_MAP[MlbTeam.Bal],
  TEX: MLB_TEAM_MAP[MlbTeam.Tex],
  HOU: MLB_TEAM_MAP[MlbTeam.Hou],
  KCR: MLB_TEAM_MAP[MlbTeam.KC],
  SEA: MLB_TEAM_MAP[MlbTeam.Sea],
  CLE: MLB_TEAM_MAP[MlbTeam.Cle],
  ARI: MLB_TEAM_MAP[MlbTeam.Ari],
  LAA: MLB_TEAM_MAP[MlbTeam.LAA],
  BOS: MLB_TEAM_MAP[MlbTeam.Bos],
  NYM: MLB_TEAM_MAP[MlbTeam.NYM],
  TOR: MLB_TEAM_MAP[MlbTeam.Tor],
  MIL: MLB_TEAM_MAP[MlbTeam.Mil],
  PHI: MLB_TEAM_MAP[MlbTeam.Phi],
  CHC: MLB_TEAM_MAP[MlbTeam.ChC],
  SFG: MLB_TEAM_MAP[MlbTeam.SF],
  STL: MLB_TEAM_MAP[MlbTeam.StL],
  TBR: MLB_TEAM_MAP[MlbTeam.TB],
  MIN: MLB_TEAM_MAP[MlbTeam.Min],
  CHW: MLB_TEAM_MAP[MlbTeam.ChW],
  PIT: MLB_TEAM_MAP[MlbTeam.Pit],
  WSN: MLB_TEAM_MAP[MlbTeam.Wsh],
  MIA: MLB_TEAM_MAP[MlbTeam.Mia],
  CIN: MLB_TEAM_MAP[MlbTeam.Cin],
  DET: MLB_TEAM_MAP[MlbTeam.Det],
  OAK: MLB_TEAM_MAP[MlbTeam.Oak],
  COL: MLB_TEAM_MAP[MlbTeam.Col],
  null: MLB_TEAM_MAP[MlbTeam.FA],
} as const;
