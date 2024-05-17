import { MLB_TEAM_MAP, MlbTeam } from 'sports-ui-sdk';

export const enum FangraphsTeam {
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
    value: [FangraphsTeam.AllTeams],
    label: 'All Teams',
  },
  {
    value: [FangraphsTeam.Angels],
    label: 'Angels',
  },
  {
    value: [FangraphsTeam.Astros],
    label: 'Astros',
  },
  {
    value: [FangraphsTeam.Athletics],
    label: 'Athletics',
  },
  {
    value: [FangraphsTeam.BlueJays],
    label: 'Blue Jays',
  },
  {
    value: [FangraphsTeam.Braves],
    label: 'Braves',
  },
  {
    value: [FangraphsTeam.Brewers],
    label: 'Brewers',
  },
  {
    value: [FangraphsTeam.Cardinals],
    label: 'Cardinals',
  },
  {
    value: [FangraphsTeam.Cubs],
    label: 'Cubs',
  },
  {
    value: [FangraphsTeam.Diamondbacks],
    label: 'Diamondbacks',
  },
  {
    value: [FangraphsTeam.Dodgers],
    label: 'Dodgers',
  },
  {
    value: [FangraphsTeam.Giants],
    label: 'Giants',
  },
  {
    value: [FangraphsTeam.Guardians],
    label: 'Guardians',
  },
  {
    value: [FangraphsTeam.Mariners],
    label: 'Mariners',
  },
  {
    value: [FangraphsTeam.Marlins],
    label: 'Marlins',
  },
  {
    value: [FangraphsTeam.Mets],
    label: 'Mets',
  },
  {
    value: [FangraphsTeam.Nationals],
    label: 'Nationals',
  },
  {
    value: [FangraphsTeam.Orioles],
    label: 'Orioles',
  },
  {
    value: [FangraphsTeam.Padres],
    label: 'Padres',
  },
  {
    value: [FangraphsTeam.Phillies],
    label: 'Phillies',
  },
  {
    value: [FangraphsTeam.Pirates],
    label: 'Pirates',
  },
  {
    value: [FangraphsTeam.Rangers],
    label: 'Rangers',
  },
  {
    value: [FangraphsTeam.Rays],
    label: 'Rays',
  },
  {
    value: [FangraphsTeam.RedSox],
    label: 'Red Sox',
  },
  {
    value: [FangraphsTeam.Reds],
    label: 'Reds',
  },
  {
    value: [FangraphsTeam.Rockies],
    label: 'Rockies',
  },
  {
    value: [FangraphsTeam.Royals],
    label: 'Royals',
  },
  {
    value: [FangraphsTeam.Tigers],
    label: 'Tigers',
  },
  {
    value: [FangraphsTeam.Twins],
    label: 'Twins',
  },
  {
    value: [FangraphsTeam.WhiteSox],
    label: 'White Sox',
  },
  {
    value: [FangraphsTeam.Yankees],
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
