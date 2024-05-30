import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../client';
import { FangraphsPlayerStatsRequestBody, FangraphsPosition, FangraphsTeam } from '../models';

export const INITIAL_STATE: FangraphsPlayerStatsRequestBody = {
  team: FangraphsTeam.AllTeams,
  pos: FangraphsPosition.All,
  players: [],
  statSplitPeriod: 0,
  meta: { pageitems: DEFAULT_PAGE_SIZE, pagenum: DEFAULT_PAGE_NUMBER },
};

export const FangraphsStatsFilterFormSlice = createSlice({
  name: 'fangraphsStatsFilterForm',
  initialState: INITIAL_STATE,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setPosition: (state, action) => {
      state.pos = action.payload;
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setStatSplitPeriod: (state, action) => {
      state.statSplitPeriod = action.payload;
    },
    setMeta: (state, action) => {
      state.meta = action.payload;
    },
  },
});

export const { setTeam, setPosition, setPlayers, setStatSplitPeriod, setMeta } = FangraphsStatsFilterFormSlice.actions;
