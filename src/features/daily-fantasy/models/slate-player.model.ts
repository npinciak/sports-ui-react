export const MOCK_SLATE_PLAYER_ENTITY: SlatePlayerEntity = {
  attributes: {},
  fpts: 23.1,
  player: {
    id: '877745',
    rg_id: '328097',
    first_name: 'Lamar',
    last_name: 'Jackson',
    position: 'QB',
    sport_id: '1',
    team_id: '366',
    rg_team_id: '1',
    xml_id: 'e06a9c07-453a-4bb0-a7e9-2c3a64166dad',
  },
  schedule: {
    date: '2024-09-06 00:20:00',
    id: '6018539',
    rg_id: '112917',
    sport_id: '1',
    team_away: {
      hashtag: 'BAL',
      id: '366',
      rg_id: '1',
      name: 'Ravens',
    },
    team_home: {
      hashtag: 'KC',
      id: '339',
      rg_id: '26',
      name: 'Chiefs',
    },
    salaries: [
      {
        position: 'QB',
        salary: 17100,
        player_id: '35259487',
      },
      {
        position: 'QB',
        salary: 11400,
        player_id: '35259422',
      },
    ],
  },
  stat_group: 'qb',
  status: null,
};

export type SlatePlayerInfoEntity = {
  id: string;
  rg_id: string;
  first_name: string;
  last_name: string;
  position: string;
  sport_id: string;
  team_id: string;
  rg_team_id: string;
  xml_id: string;
};

export type SlatePlayerScheduleEntity = {
  date: string;
  id: string;
  rg_id: string;
  sport_id: string;
  team_away: SlatePlayerTeamEntity;
  team_home: SlatePlayerTeamEntity;
  salaries: SlatePlayerSalaryEntity[];
};

export type SlatePlayerEntity = {
  attributes: Record<string, unknown>;
  fpts: number;
  player: SlatePlayerInfoEntity;
  schedule: SlatePlayerScheduleEntity;
  stat_group: string;
  status: null;
};

export type SlatePlayerTeamEntity = {
  hashtag: string;
  id: string;
  rg_id: string;
  name: string;
};

export type SlatePlayerSalaryEntity = {
  position: string;
  salary: number;
  player_id: string;
};
