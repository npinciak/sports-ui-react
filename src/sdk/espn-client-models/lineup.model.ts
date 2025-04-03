export interface LineupAttributes {
  id: number;
  parentId: number;
  abbrev: string | null;
  bench: boolean;
  eligiblePositions: number[];
  lineupSlotEligible: boolean;
  name: string  | null;
  starter: boolean;
  displayOrder: number;
  active: boolean;
}

export type LineupEntity = LineupAttributes;
export type LineupEntityMap = Record<number, LineupEntity>;
