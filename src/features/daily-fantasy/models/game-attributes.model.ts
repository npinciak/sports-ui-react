export type PlayerGameAttributes = {
  props?: Record<string, string>;
  stats?: Record<string, string>;
};

export type TeamGameAttributes = {
  vegas: VegasEntity;
  outsiders: OutsidersEntity;
};

export type GameAttributes = {
  players: Record<string, PlayerGameAttributes>;
  teams: Record<string, TeamGameAttributes>;
};

type VegasAttributes = 'o/u' | 'opp_total' | 'total' | 'line' | 'movement';

export type VegasEntity = Record<VegasAttributes, number>;

type OutsidersAttributes =
  | 'D Power'
  | 'D Power Rk'
  | 'D Stuffed'
  | 'D Stuffed Rk'
  | 'DL SkRate'
  | 'DL SkRate Rk'
  | 'O Power'
  | 'O Power Rk'
  | 'O Stuffed'
  | 'O Stuffed Rk'
  | 'OL SkRate'
  | 'OL SkRate Rk'
  | 'Opp PaDef'
  | 'Opp PaDef Rk'
  | 'Opp RuDef'
  | 'Opp RuDef Rk'
  | 'PaOff'
  | 'PaOff Rk'
  | 'RuOff'
  | 'RuOff Rk';

export type OutsidersEntity = Record<OutsidersAttributes, number>;
