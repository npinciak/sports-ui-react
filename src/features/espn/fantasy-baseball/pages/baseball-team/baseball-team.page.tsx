import { TypeSortInfo } from '@inovua/reactdatagrid-community/types';
import { useParams } from 'react-router-dom';
import { BASEBALL_LINEUP_MAP } from 'sports-ui-sdk';
import {
  useCreateEspnPlayerMutation,
  useGetFangraphProjectionsQuery,
} from '../../../../../@shared/supabase/supabase.client';
import { useFetchTeamByIdQuery } from '../../client/fantasy-baseball.client';
import { BaseballLineupCard } from '../../components';
import { startingPlayersFilter } from '../../helpers';

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

  const defaultSortInfo: TypeSortInfo = [];

  const { data: fangraphsProj } = useGetFangraphProjectionsQuery({});

  // const startingBatters = useSelector(selectTeamStartingLineupBatters)(teamId!);
  // const startingPitchers = useSelector(selectTeamStartingLineupPitchers)(
  //   teamId!
  // );

  // const playerStats = useSelector(selectTeamBatterStats)(
  //   teamId!,
  //   BaseballScoringPeriod.season(year!)
  // );

  // const test = fangraphsProj?.reduce(
  //   (acc, player) => {
  //     const id = `name=${normalizeName(player.PlayerName)}~team=${player.Team ? FangraphsTeamToEspnTeam[player.Team].toLowerCase() : ''}`;
  //     acc[id] = { ...player };
  //     return acc;
  //   },
  //   {} as Record<string, any>
  // );

  // const espnToFangraphsStartingBatters = startingBatters?.map(player => {
  //   const id = `name=${normalizeName(player.name)}~team=${player.team ? player.team.toLowerCase() : ''}`;
  //   return test
  //     ? {
  //         espn: {
  //           name: player.name,
  //           team: player.team,
  //           sportsUi: id,
  //           espnId: player.id,
  //           positionId: player.defaultPositionId,
  //         },
  //         fangraphs: {
  //           ...test[id],
  //         },
  //       }
  //     : null;
  // });

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

  if (isLoading) return <div>Loading...</div>;

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
          <BaseballLineupCard players={startingBatters} />

          <div className="py-3"></div>
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
          {/* <div>
            <BaseballPlayerStatsTable
              data={playerStats}
              defaultSortInfo={defaultSortInfo}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
