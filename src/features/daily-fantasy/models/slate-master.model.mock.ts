import { SlateMasterEntity } from './slate-master.model';

export const MOCK_SLATE_MASTER_ENTITY: SlateMasterEntity = {
  date: '2024-09-05',
  importId: '3436465026',
  name: '2024-09-05 8:20pm (BAL @ KC (Sep 5))',
  games: [
    {
      date: '2024-09-06 00:20:00',
      time: '8:20PM ET',
      scheduleId: '112917',
      rgScheduleId: '112917',
      teamAwayId: '1',
      rgTeamAwayId: '1',
      teamHomeId: '26',
      rgTeamHomeId: '26',
      teamAwayHashtag: 'BAL',
      teamHomeHashtag: 'KC',
    },
  ],
  start: '2024-09-05T20:20:00',
  type: 'showdown',
  salaryCap: 27500,
  slate_path: 'https://s3.amazonaws.com/json.rotogrinders.com/v2.00/slates/ownersbox/26/3436465026.json',
};
