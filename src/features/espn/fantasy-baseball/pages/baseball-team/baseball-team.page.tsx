import { TypeSortInfo } from '@inovua/reactdatagrid-community/types';
import { useParams } from 'react-router-dom';
import {
  useCreateEspnPlayerMutation,
  useGetFangraphProjectionsQuery,
} from '../../../../../@shared/supabase/supabase.client';
import { useFetchTeamByIdQuery } from '../../client/fantasy-baseball.client';

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

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
              {/* {startingBatters.map(player => (
                <div className="grid grid-cols-4 py-3" key={player.id}>
                  <div>
                    <img
                      className="w-13 h-9 rounded-full text-center text-xs text-gray-500"
                      src={player.img}
                      alt={player.name}
                      role="presentation"
                      aria-roledescription="presentation"
                    />
                  </div>
                  <div className="col-span-3">
                    {player.name}
                    <div className="text-xs">
                      {player.team}
                      <span className="font-bold"> {player.lineupSlot}</span>
                    </div>
                  </div>
                </div>
              ))} */}

              <div className="py-3"></div>
              {/* {startingPitchers.map(player => (
                <div className="grid grid-cols-4 py-3" key={player.id}>
                  <div>
                    <img
                      className="w-13 h-9 rounded-full text-center text-xs text-gray-500"
                      src={player.img}
                      alt={player.name}
                      role="presentation"
                      aria-roledescription="presentation"
                    />
                  </div>
                  <div className="col-span-3">
                    {player.name}
                    <div className="text-xs">
                      {player.team}
                      <span className="font-bold"> {player.lineupSlot}</span>
                    </div>
                  </div>
                </div>
              ))} */}
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
      )}
    </>
  );
}
