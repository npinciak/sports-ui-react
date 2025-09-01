import { ClientNflPosition } from './nfl-position.model';

export const NFL_POSITION_MAP = {
  [ClientNflPosition.POS0]: {
    abbrev: 'POS0',
    name: 'POS0',
  },
  [ClientNflPosition.QB]: {
    abbrev: 'QB',
    name: 'Quarterback',
  },
  [ClientNflPosition.RB]: {
    abbrev: 'RB',
    name: 'Running Back',
  },
  [ClientNflPosition.WR]: {
    abbrev: 'WR',
    name: 'Wide Receiver',
  },
  [ClientNflPosition.TE]: {
    abbrev: 'TE',
    name: 'Tight End',
  },
  [ClientNflPosition.K]: {
    abbrev: 'K',
    name: 'Place Kicker',
  },
  [ClientNflPosition.POS6]: {
    abbrev: 'POS6',
    name: 'POS6',
  },
  [ClientNflPosition.P]: {
    abbrev: 'P',
    name: 'Punter',
  },
  [ClientNflPosition.POS8]: {
    abbrev: 'POS8',
    name: 'POS8',
  },
  [ClientNflPosition.DT]: {
    abbrev: 'DT',
    name: 'Defensive Tackle',
  },
  [ClientNflPosition.DE]: {
    abbrev: 'DE',
    name: 'Defensive End',
  },
  [ClientNflPosition.LB]: {
    abbrev: 'LB',
    name: 'Linebacker',
  },
  [ClientNflPosition.CB]: {
    abbrev: 'CB',
    name: 'Cornerback',
  },
  [ClientNflPosition.S]: {
    abbrev: 'S',
    name: 'Safety',
  },
  [ClientNflPosition.HC]: {
    abbrev: 'HC',
    name: 'Head Coach',
  },
  [ClientNflPosition.TQB]: {
    abbrev: 'TQB',
    name: 'Team Quarterback',
  },
  [ClientNflPosition.DST]: {
    abbrev: 'D/ST',
    name: 'Team Defense/Special Teams',
  },
  [ClientNflPosition.EDR]: {
    abbrev: 'EDR',
    name: 'Edge Rusher',
  },
} as const;
