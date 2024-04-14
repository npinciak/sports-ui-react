import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballTeamLiveAdapter, baseballTeamLiveSlice } from '../slice/baseball-team-live.slice';
import { selectTeamById } from './baseball-team.selector';

export const baseballTeamLiveSelector = baseballTeamLiveAdapter.getSelectors<RootState>(store => store.baseballTeamLive);

export const standings = createSelector(
  [baseballTeamLiveSlice.selectors.selectAllEntitiesList, selectTeamById],
  (liveTeamList, teamById) => {
    return liveTeamList
      .map(liveTeam => ({
        ...liveTeam,
        team: teamById(liveTeam.id),
      }))
      .sort((a, b) => b.liveScore - a.liveScore);
  }
);
