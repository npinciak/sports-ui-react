import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { fastcastLeagueAdapter } from '../slices/fastcast-league.slice';

const fastcastleaguesSlice = (state: RootState) => state.fastcastLeagues;
export const fastcastLeaguelsAdapterSelector = fastcastLeagueAdapter.getSelectors<RootState>(fastcastleaguesSlice);

export const selectLeagueIds = createSelector([fastcastleaguesSlice], state => state.ids);
export const selectLeagueIdSet = createSelector([selectLeagueIds], ids => new Set(ids));
export const selectLeagueEntities = createSelector([fastcastleaguesSlice], state => state.entities);
export const selectLeagueEntityList = createSelector([selectLeagueEntities], entities => Object.values(entities));
