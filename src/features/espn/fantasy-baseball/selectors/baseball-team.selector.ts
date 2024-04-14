import { RootState } from '../../../../app.store';
import { baseballTeamAdapter, baseballTeamSlice } from '../slice/baseball-team.slice';

export const BaseballTeamSelector = baseballTeamAdapter.getSelectors<RootState>(store => store.baseballTeam);
export const BaseballTeamSelectorTest = baseballTeamSlice.selectors.selectAllEntities.unwrapped;

export function selectTeamById(state: RootState) {
  const selectById = BaseballTeamSelector.selectById;
  return (id: string) => selectById(state, id);
}
