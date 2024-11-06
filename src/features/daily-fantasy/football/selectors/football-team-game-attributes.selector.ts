import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';

const teamGameAttributesSlice = (state: RootState) => state.teamGameAttributesSlice;

export const getTeamGameAttributesEntityList = createSelector(teamGameAttributesSlice, state => Object.values(state.entities));

export const getTeamGameAttributesById = createSelector(teamGameAttributesSlice, state => (id: string) => state.entities[id]);
