import { MLB_TEAM_MAP } from '@sdk/espn-client-models/baseball/team/mlb-team.const';
import { ClientMlbTeam } from '@sdk/espn-client-models/baseball/team/mlb-team.model';

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
  ATL: MLB_TEAM_MAP[ClientMlbTeam.Atl],
  LAD: MLB_TEAM_MAP[ClientMlbTeam.LAD],
  NYY: MLB_TEAM_MAP[ClientMlbTeam.NYY],
  SDP: MLB_TEAM_MAP[ClientMlbTeam.SD],
  BAL: MLB_TEAM_MAP[ClientMlbTeam.Bal],
  TEX: MLB_TEAM_MAP[ClientMlbTeam.Tex],
  HOU: MLB_TEAM_MAP[ClientMlbTeam.Hou],
  KCR: MLB_TEAM_MAP[ClientMlbTeam.KC],
  SEA: MLB_TEAM_MAP[ClientMlbTeam.Sea],
  CLE: MLB_TEAM_MAP[ClientMlbTeam.Cle],
  ARI: MLB_TEAM_MAP[ClientMlbTeam.Ari],
  LAA: MLB_TEAM_MAP[ClientMlbTeam.LAA],
  BOS: MLB_TEAM_MAP[ClientMlbTeam.Bos],
  NYM: MLB_TEAM_MAP[ClientMlbTeam.NYM],
  TOR: MLB_TEAM_MAP[ClientMlbTeam.Tor],
  MIL: MLB_TEAM_MAP[ClientMlbTeam.Mil],
  PHI: MLB_TEAM_MAP[ClientMlbTeam.Phi],
  CHC: MLB_TEAM_MAP[ClientMlbTeam.ChC],
  SFG: MLB_TEAM_MAP[ClientMlbTeam.SF],
  STL: MLB_TEAM_MAP[ClientMlbTeam.StL],
  TBR: MLB_TEAM_MAP[ClientMlbTeam.TB],
  MIN: MLB_TEAM_MAP[ClientMlbTeam.Min],
  CHW: MLB_TEAM_MAP[ClientMlbTeam.ChW],
  PIT: MLB_TEAM_MAP[ClientMlbTeam.Pit],
  WSN: MLB_TEAM_MAP[ClientMlbTeam.Wsh],
  MIA: MLB_TEAM_MAP[ClientMlbTeam.Mia],
  CIN: MLB_TEAM_MAP[ClientMlbTeam.Cin],
  DET: MLB_TEAM_MAP[ClientMlbTeam.Det],
  OAK: MLB_TEAM_MAP[ClientMlbTeam.Oak],
  COL: MLB_TEAM_MAP[ClientMlbTeam.Col],
  null: MLB_TEAM_MAP[ClientMlbTeam.FA],
} as const;
