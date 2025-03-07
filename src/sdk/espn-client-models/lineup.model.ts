export interface LineupAttributes {
  id: number;
  parentId: number;
  abbrev: string;
  bench: boolean;
  eligiblePositions: number[];
  lineupSlotEligible: boolean;
  name: string;
  starter: boolean;
  displayOrder: number;
  active: boolean;
}

export type LineupEntity = LineupAttributes;
export type LineupEntityMap = Record<number, LineupEntity>;
