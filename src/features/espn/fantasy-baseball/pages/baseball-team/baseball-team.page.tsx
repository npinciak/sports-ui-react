import { useParams } from 'react-router-dom';
import { BASEBALL_LINEUP_MAP } from 'sports-ui-sdk';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  FangraphsPlayerProjectionEntity,
  FangraphsPlayerProjectionsRequestBody,
  FangraphsPlayerStatsRequestBody,
  FangraphsProjection,
  FangraphsTeam,
  FangraphsTeamToEspnTeam,
} from '../../../../../@shared/fangraphs/';
import {
  useGetFangraphProjectionsQuery,
  useGetFangraphStatsQuery,
} from '../../../../../@shared/fangraphs/client/fangraphs.client';
import { FangraphsPosition } from '../../../../../@shared/fangraphs/models';
import { useCreateEspnPlayerMutation } from '../../../../../@shared/supabase/supabase.client';
import { normalizeName } from '../../../espn-helpers';
import { useFetchTeamByIdQuery } from '../../client/fantasy-baseball.client';
import { BaseballLineupCard, BaseballPlayerStatsTable } from '../../components';
import { startingPlayersFilter } from '../../helpers';
import { mapFangraphsPlayersToBaseballTeam } from '../../transformers';

export function BaseballTeam() {
  const { year, leagueId, teamId } = useParams<{
    year: string;
    leagueId: string;
    teamId: string;
  }>();

  const { data: team, isLoading } = useFetchTeamByIdQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
    teamId: teamId ?? '',
  });

  const [createEspnPlayer] = useCreateEspnPlayerMutation();

  const projectionsFilter: FangraphsPlayerProjectionsRequestBody = {
    type: FangraphsProjection.RestOfSeasonTheBatX,
    team: FangraphsTeam.AllTeams,
    pos: FangraphsPosition.All,
  };

  const { data: fangraphsProj, isLoading: isFangraphsProjectionsLoading } =
    useGetFangraphProjectionsQuery(projectionsFilter);

  const fangraphsProjections = fangraphsProj?.reduce(
    (acc, player) => {
      const id = `name=${normalizeName(player.PlayerName)}~team=${player.Team ? FangraphsTeamToEspnTeam[player.Team].toLowerCase() : ''}`;
      acc[id] = { ...player };
      return acc;
    },
    {} as Record<string, unknown>
  );

  const handleSyncBatters = async () => {
    // const player: SupaClientEspnPlayerInsert[] =
    //   espnToFangraphsStartingBatters.map((player: any) => {
    //     if (!player) return null;
    //     const {
    //       espn: { espnId, positionId, name, team, sportsUi },
    //       fangraphs: { playerid },
    //     } = player;
    //     return {
    //       espn_id: espnId,
    //       espn_position_id: positionId,
    //       name: name,
    //       team: team,
    //       sportsUid: sportsUi,
    //       fangraphs_id: playerid,
    //     };
    //   });
    // await createEspnPlayer(player);
  };

  const batters = team?.roster?.filter(
    p => !p.isPitcher || p.lineupSlotId === 12
  );

  const pitchers = team?.roster?.filter(
    p => p.isPitcher && p.lineupSlotId !== 12
  );

  const startingBatters = startingPlayersFilter(
    batters ?? [],
    BASEBALL_LINEUP_MAP
  );

  const startingPitchers = startingPlayersFilter(
    pitchers ?? [],
    BASEBALL_LINEUP_MAP
  );

  const espnToFangraphsStartingBatters = mapFangraphsPlayersToBaseballTeam(
    startingBatters,
    fangraphsProjections as Record<string, FangraphsPlayerProjectionEntity>
  );

  const fangraphIds = espnToFangraphsStartingBatters?.map(player =>
    Number(
      (player?.fangraphsProjection as FangraphsPlayerProjectionEntity)?.playerid
    )
  );

  const statsFilter: FangraphsPlayerStatsRequestBody = {
    team: FangraphsTeam.AllTeams,
    pos: FangraphsPosition.All,
    players: fangraphIds,
    meta: {
      pageitems: DEFAULT_PAGE_SIZE,
      pagenum: DEFAULT_PAGE_NUMBER,
    },
  };

  const { data: fangraphsStats, isLoading: isFangraphsStatsLoading } =
    useGetFangraphStatsQuery(statsFilter);

    const {data} = useGetFangraphProjectionsQuery(projectionsFilter);

  if (isLoading && isFangraphsProjectionsLoading && isFangraphsStatsLoading)
    return <div className="animate-pulse">Loading...</div>;

  return (
    <div key={team?.id}>
      <div className="grid grid-cols-3 text-left mb-5 mt-5">
        <div>
          <img
            alt={team?.name}
            role="presentation"
            aria-roledescription="presentation"
            src={team?.logo}
          />
        </div>
        <div className="col-span-2">
          <h1>
            {team?.name} {team?.totalPoints}
          </h1>
          <div>
            <span className="text-xs">Rank: {team?.currentRank}</span>
          </div>
        </div>
      </div>

      <div className="flex text-left">
        <div className="w-full px-4 xl:w-4/12">
          <div className="font-bold">Starting Batters</div>
          <BaseballLineupCard players={startingBatters} />
          <div className="py-3"></div>
          <div className="font-bold">Starting Pitchers</div>
          <BaseballLineupCard players={startingPitchers} />
        </div>

        <div className="w-full px-4 xl:w-8/12">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSyncBatters}
            >
              Sync Batters
            </button>
          </div>
          <div>
            <BaseballPlayerStatsTable data={fangraphsStats?.data ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
