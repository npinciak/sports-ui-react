export interface FangraphsPlayerProjectionEntity {
  Team: string;
  ShortName: string;
  G: number;
  AB: number;
  PA: number;
  H: number;
  '1B': number;
  '2B': number;
  '3B': number;
  HR: number;
  R: number;
  RBI: number;
  BB: number;
  IBB: number;
  SO: number;
  HBP: number;
  SF: number;
  SH: number;
  GDP: number;
  SB: number;
  CS: number;
  AVG: number;
  OBP: number;
  SLG: number;
  OPS: number;
  wOBA: number;
  'BB%': number;
  'K%': number;
  'BB/K': number;
  ISO: number;
  Spd: number;
  BABIP: number;
  UBR?: null;
  GDPRuns?: null;
  wRC: number;
  wRAA: number;
  UZR: number;
  wBsR: number;
  BaseRunning: number;
  WAR: number;
  Off: number;
  Def: number;
  'wRC+': number;
  ADP: number;
  Pos: number;
  minpos: string;
  teamid: number;
  League: string;
  PlayerName: string;
  playerids: string;
  playerid: string;
}
