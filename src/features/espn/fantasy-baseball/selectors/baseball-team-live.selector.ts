import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballTeamLiveAdapter } from '../slices/baseball-team-live.slice';
import { selectTeamById } from './baseball-team.selector';

export const BaseballTeamLiveEntitySelectors = baseballTeamLiveAdapter.getSelectors<RootState>(store => store.baseballTeamLive);

export function selectLiveTeamById(state: RootState) {
  return (id: string) => BaseballTeamLiveEntitySelectors.selectById(state, id);
}

export function selectLiveTeamList(state: RootState) {
  return BaseballTeamLiveEntitySelectors.selectAll(state);
}

export const standings = createSelector([selectLiveTeamList, selectTeamById], (liveTeamList, teamById) =>
  liveTeamList
    .map(liveTeam => ({
      ...liveTeam,
      team: teamById(liveTeam.id),
    }))
    .sort((a, b) => b.liveScore - a.liveScore)
);
