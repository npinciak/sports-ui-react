import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { BaseballTeam } from '../models/baseball-team.model';

export const baseballTeamAdapter = createEntityAdapter({
  selectId: (team: BaseballTeam) => team.id,
  sortComparer: (a: BaseballTeam, b: BaseballTeam) => Number(a.id) - Number(b.id),
});

export const baseballTeamSlice = createSlice({
  name: 'baseballTeam',
  initialState: baseballTeamAdapter.getInitialState(),
  reducers: {},
});
