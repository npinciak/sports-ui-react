import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballTeamAdapter } from '../slices/baseball-team.slice';

const baseballTeamState = (state: RootState) => state.baseballTeam;

export const BaseballTeamEntitySelector = baseballTeamAdapter.getSelectors<RootState>(baseballTeamState);

export const getTeamById = createSelector([baseballTeamState], state => (id: string) => state.entities[id]);
