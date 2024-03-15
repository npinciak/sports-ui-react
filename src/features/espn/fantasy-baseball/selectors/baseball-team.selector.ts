import { RootState } from '../../../../app.store';
import { baseballTeamAdapter } from '../store/baseball-team.store';

export const BaseballTeamSelector = baseballTeamAdapter.getSelectors<RootState>(store => store.fantasyBaseballTeam);
