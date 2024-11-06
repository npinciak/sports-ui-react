import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';

const playerGameAttributesSlice = (state: RootState) => state.playerGameAttributesSlice;

export const selectPlayerGameAttributesById = createSelector(playerGameAttributesSlice, state => (id: string) => state.entities[id]);
