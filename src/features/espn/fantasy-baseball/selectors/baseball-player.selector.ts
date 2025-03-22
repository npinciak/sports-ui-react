import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballPlayersAdapter } from '../slices/baseball-players.slice';

const baseballPlayerState = (state: RootState) => state.baseballPlayers;

const { selectById, selectIds, selectAll } = baseballPlayersAdapter.getSelectors<RootState>(baseballPlayerState);

export const selectPlayerIds = createSelector(
  state => state,
  state => selectIds(state)
);

export const selectPlayerEntityList = createSelector(
  state => state,
  state => selectAll(state)
);

export const selectPlayerById = createSelector(
  state => state,
  state => (id: string | null) => {
    if (!id) return null;

    return selectById(state, id) ?? null;
  }
);
