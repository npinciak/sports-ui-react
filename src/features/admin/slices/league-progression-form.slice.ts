import { createSlice } from '@reduxjs/toolkit';

type AdminLeagueProgressionForm = {
  espnTeamId: number | null;
  leagueId: string | null;
  leagueTeamId: string | null;
  totalPoints: number | null;
  rank: number | null;
};

const INITIAL_STATE: AdminLeagueProgressionForm = {
  espnTeamId: null,
  leagueId: null,
  leagueTeamId: null,
  totalPoints: null,
  rank: null,
};

export const AdminLeagueProgressionFormSlice = createSlice({
  name: 'adminLeagueProgressionForm',
  initialState: INITIAL_STATE,
  reducers: {
    setEspnTeamId: (state, action) => {
      state.espnTeamId = action.payload;
    },
    setLeagueId: (state, action) => {
      state.leagueId = action.payload;
    },
    setLeagueTeamId: (state, action) => {
      state.leagueTeamId = action.payload;
    },
    setTotalPoints: (state, action) => {
      state.totalPoints = action.payload;
    },
    setRank: (state, action) => {
      state.rank = action.payload;
    },
  },
});

export const { setEspnTeamId, setLeagueId, setLeagueTeamId, setTotalPoints, setRank } = AdminLeagueProgressionFormSlice.actions;
