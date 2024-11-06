export const GRID_IRON_PROJECTIONS = {
  BlitzDefault: 2009661,
  BlitzDefenseAgnostic: 3202616,
  BlitzDefenseDeflated: 3202618,
  Default: 3350867,
} as const;

export type GridIronProjection = (typeof GRID_IRON_PROJECTIONS)[keyof typeof GRID_IRON_PROJECTIONS];
