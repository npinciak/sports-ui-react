import { DFS_SITES } from './dfs-site.model';
import { LineupHeadquartersPlayerEntity } from './lineuphq-player.model';

export const MOCK_NFL_LINEUPHQ_PLAYER_ENTITY: LineupHeadquartersPlayerEntity = {
  site_ids: {
    [DFS_SITES.OwnersBox]: '115945056',
    [DFS_SITES.FanDuel]: '22015',
    [DFS_SITES.DraftKings]: '401534',
    [DFS_SITES.Yahoo]: 'nfl.p.25785',
  },
  salaries: {
    [DFS_SITES.OwnersBox]: 5700,
    [DFS_SITES.FanDuel]: 6900,
    [DFS_SITES.DraftKings]: '5400',
    [DFS_SITES.Yahoo]: 25,
  },
  positions: {
    [DFS_SITES.OwnersBox]: 'QB/SFLEX',
    [DFS_SITES.FanDuel]: 'QB',
    [DFS_SITES.DraftKings]: 'QB',
    [DFS_SITES.Yahoo]: 'QB',
  },
  name: 'Russell Wilson',
};

export const MOCK_NFL_LINEUPHQ_PLAYER_MAP = {
  '13560': MOCK_NFL_LINEUPHQ_PLAYER_ENTITY,
};
