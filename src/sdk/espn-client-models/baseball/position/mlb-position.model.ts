export const enum ClientMlbPosition {
  Undefined,
  StartingPitcher,
  Catcher,
  FirstBase,
  SecondBase,
  ThirdBase,
  Shortstop,
  LeftField,
  CenterField,
  RightField,
  DesignatedHitter,
  ReliefPitcher,
  PinchHitter,
  PinchRunner,
}

export const MLB_POSITION_MAP = {
  [ClientMlbPosition.Undefined]: {
    abbrev: 'POS0',
    name: 'Undefined',
  },
  [ClientMlbPosition.StartingPitcher]: {
    abbrev: 'SP',
    name: 'Starting Pitcher',
  },
  [ClientMlbPosition.Catcher]: {
    abbrev: 'C',
    name: 'Catcher',
  },
  [ClientMlbPosition.FirstBase]: {
    abbrev: '1B',
    name: 'First Base',
  },
  [ClientMlbPosition.SecondBase]: {
    abbrev: '2B',
    name: 'Second Base',
  },
  [ClientMlbPosition.ThirdBase]: {
    abbrev: '3B',
    name: 'Third Base',
  },
  [ClientMlbPosition.Shortstop]: {
    abbrev: 'SS',
    name: 'Shortstop',
  },
  [ClientMlbPosition.LeftField]: {
    abbrev: 'LF',
    name: 'Left Field',
  },
  [ClientMlbPosition.CenterField]: {
    abbrev: 'CF',
    name: 'Center Field',
  },
  [ClientMlbPosition.RightField]: {
    abbrev: 'RF',
    name: 'Right Field',
  },
  [ClientMlbPosition.DesignatedHitter]: {
    abbrev: 'DH',
    name: 'Designated Hitter',
  },
  [ClientMlbPosition.ReliefPitcher]: {
    abbrev: 'RP',
    name: 'Relief Pitcher',
  },
  [ClientMlbPosition.PinchHitter]: {
    abbrev: 'PH',
    name: 'Pinch Hitter',
  },
  [ClientMlbPosition.PinchRunner]: {
    abbrev: 'PR',
    name: 'Pinch Runner',
  },
} as const;
