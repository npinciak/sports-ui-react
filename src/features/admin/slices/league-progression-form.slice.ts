import { createSlice } from '@reduxjs/toolkit';

type AdminLeagueProgressionForm = {
  espnTeamId: string;
  leagueId: string;
  leagueTeamId: string;
  totalPoints: string;
  rank: string;
};

const INITIAL_STATE: AdminLeagueProgressionForm = {
  espnTeamId: '',
  leagueId: '',
  leagueTeamId: '',
  totalPoints: '',
  rank: '',
};

export const AdminLeagueProgressionFormSlice = createSlice({
  name: 'adminLeagueProgressionForm',
  initialState: INITIAL_STATE,
  reducers: {
    resetForm: state => {
      state = INITIAL_STATE;
    },
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

export const { setEspnTeamId, setLeagueId, setLeagueTeamId, setTotalPoints, setRank, resetForm } = AdminLeagueProgressionFormSlice.actions;
