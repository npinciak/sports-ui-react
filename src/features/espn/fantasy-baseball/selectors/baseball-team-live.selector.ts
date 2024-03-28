import { RootState } from '../../../../app.store';
import { baseballTeamLiveAdapter } from '../store/baseball-team-live.store';

export const BaseballTeamLiveSelector = baseballTeamLiveAdapter.getSelectors<RootState>(store => store.baseballTeamLive);
