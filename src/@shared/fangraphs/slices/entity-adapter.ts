import { createEntityAdapter } from '@reduxjs/toolkit';
import { normalizeName } from 'src/features/espn/espn-helpers';
import { FangraphsPlayerProjectionEntity, FangraphsTeamToEspnTeam } from '../models';

export const FangraphsPlayerAdapter = createEntityAdapter({
  selectId: (player: FangraphsPlayerProjectionEntity) =>
    `name=${normalizeName(player?.PlayerName)}~team=${player.Team ? FangraphsTeamToEspnTeam[player.Team]?.toLowerCase() : ''}` as string,
  sortComparer: (a: FangraphsPlayerProjectionEntity, b: FangraphsPlayerProjectionEntity) => Number(a.playerid) - Number(b.playerid),
});
