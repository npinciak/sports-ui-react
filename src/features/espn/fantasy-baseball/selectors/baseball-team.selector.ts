import { RootState } from '../../../../app.store';
import { baseballTeamAdapter } from '../slices/baseball-team.slice';

export const BaseballTeamSelector = baseballTeamAdapter.getSelectors<RootState>(store => store.baseballTeam);

export function selectTeamById(state: RootState) {
  return (id: string) => BaseballTeamSelector.selectById(state, id);
}

export function selectTeamList(state: RootState) {
  return BaseballTeamSelector.selectAll(state);
}
