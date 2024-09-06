import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';
import { TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE } from '../football/helpers/target-value-calculator/target-value-by-position.const';
import { TargetValueCalculator } from '../football/helpers/target-value-calculator/target-value-calculator';
import { getTeamGameAttributesById } from '../football/selectors';
import { slatePlayersAdapter } from '../slices/slate-player.slice';

const slatePlayersState = (state: RootState) => state.slatePlayers;

export const { selectById, selectEntities } = slatePlayersAdapter.getSelectors<RootState>(slatePlayersState);

export const getSlatePlayerById = createSelector(
  state => state,
  state => (entityId: string) => selectById(state, entityId)
);

export const getSlatePlayerList = createSelector(
  state => state,
  state => Object.values(selectEntities(state))
);

export const getSlatePlayerListWithGameAttributes = createSelector(
  [getSlatePlayerList, getTeamGameAttributesById],
  (slatePlayers, teamGameAttributes) => {
    return slatePlayers.map(slatePlayer => {
      const teamAttributes = slatePlayer.player.team_id ? teamGameAttributes(slatePlayer.player.rg_team_id) : null;

      const { valueTargetGPPs, valueTargetCash, targetValueDiffGPPs, targetValueDiffCash } = new TargetValueCalculator({
        salary: slatePlayer.schedule.salaries[0].salary,
        fantasyPoints: slatePlayer.fpts,
        position: slatePlayer.player.position,
        dfsSite: 'draftkings',
        configuration: TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE,
      });

      return {
        ...slatePlayer,
        ...teamAttributes,
        valueTargetGPPs,
        valueTargetCash,
        targetValueDiffGPPs,
        targetValueDiffCash,
      };
    });
  }
);

export const getUniqueSlatePlayerTeamList = createSelector(getSlatePlayerList, slatePlayers => {
  const teamSet = new Set<string>();
  slatePlayers.forEach(slatePlayer => teamSet.add(slatePlayer.player.team_id));
  return Array.from(teamSet).sort((a, b) => a.localeCompare(b));
});

export const getUniqueSlatePlayerStatGroupList = createSelector(getSlatePlayerList, slatePlayers => {
  const statGroupSet = new Set<string>();
  slatePlayers.forEach(slatePlayer => statGroupSet.add(slatePlayer.stat_group));
  return Array.from(statGroupSet).sort((a, b) => a.localeCompare(b));
});
