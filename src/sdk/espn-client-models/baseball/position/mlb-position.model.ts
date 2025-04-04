export const enum MlbPosition {
  POS0,
  SP,
  C,
  First,
  Second,
  Third,
  SS,
  LF,
  CF,
  RF,
  DH,
  RP,
  PH,
  PR,
}

export const MLB_POSITION_MAP = {
  0: {
    abbrev: 'POS0',
    name: 'POS0',
  },
  1: {
    abbrev: 'SP',
    name: 'Starting Pitcher',
  },
  2: {
    abbrev: 'C',
    name: 'Catcher',
  },
  3: {
    abbrev: '1B',
    name: 'First Base',
  },
  4: {
    abbrev: '2B',
    name: 'Second Base',
  },
  5: {
    abbrev: '3B',
    name: 'Third Base',
  },
  6: {
    abbrev: 'SS',
    name: 'Shortstop',
  },
  7: {
    abbrev: 'LF',
    name: 'Left Field',
  },
  8: {
    abbrev: 'CF',
    name: 'Center Field',
  },
  9: {
    abbrev: 'RF',
    name: 'Right Field',
  },
  10: {
    abbrev: 'DH',
    name: 'Designated Hitter',
  },
  11: {
    abbrev: 'RP',
    name: 'Relief Pitcher',
  },
  12: {
    abbrev: 'PH',
    name: 'Pinch Hitter',
  },
  13: {
    abbrev: 'PR',
    name: 'Pinch Runner',
  },
} as const;
