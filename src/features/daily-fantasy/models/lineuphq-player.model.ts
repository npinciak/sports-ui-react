export type LineupHeadquartersPlayerMap = Record<string, LineupHeadquartersPlayerEntity>;

export type LineupHeadquartersPlayerEntity = {
  site_ids: Partial<LineupHeadquartersSiteIdEntity>;
  salaries: Partial<LineupHeadquartersPlayerSalaryEntity>;
  positions: Partial<LineupHeadquartersPlayerPositionEntity>;
  name: string;
};

export type LineupHeadquartersSiteIdEntity = {
  ownersbox: string;
  fanduel: string;
  draftkings: string;
  yahoo: string;
};

export type LineupHeadquartersPlayerSalaryEntity = {
  ownersbox: number;
  fanduel: number;
  draftkings: string;
  yahoo: number;
};

export type LineupHeadquartersPlayerPositionEntity = {
  ownersbox: string;
  fanduel: string;
  draftkings: string;
  yahoo: string;
};
