import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballTeamLiveAdapter } from '../slices/baseball-team-live.slice';
import { getTeamById } from './baseball-team.selector';

const baseballTeamLiveState = (state: RootState) => state.baseballTeamLive;

export const BaseballTeamLiveEntitySelectors = baseballTeamLiveAdapter.getSelectors<RootState>(baseballTeamLiveState);

export const getLiveTeamList = createSelector([baseballTeamLiveState], state => state.ids.map(id => state.entities[id]));

export const getLiveTeamById = createSelector([baseballTeamLiveState], state => (id: string) => state.entities[id]);

export const standings = createSelector([getLiveTeamList, getTeamById], (liveTeamList, teamById) =>
  liveTeamList
    .map(liveTeam => ({
      ...liveTeam,
      team: teamById(liveTeam.id),
    }))
    .sort((a, b) => b.liveScore - a.liveScore)
);
