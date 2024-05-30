import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SelectComponent } from '../../../../../@shared';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  FangraphsPlayerProjectionsRequestBody,
  FangraphsPlayerStatsRequestBody,
  FangraphsProjection,
  FangraphsTeam,
  setStatSplitPeriod,
} from '../../../../../@shared/fangraphs/';
import {
  useGetFangraphStatsQuery,
  useGetStatPeriodSplitOptionsQuery,
  useRefetchStatsMutation,
} from '../../../../../@shared/fangraphs/client/fangraphs.client';
import { FangraphsPosition } from '../../../../../@shared/fangraphs/models';
import { selectFangraphsPlayerEntities } from '../../../../../@shared/fangraphs/selectors';
import { selectStatSplitPeriod } from '../../../../../@shared/fangraphs/selectors/stats-filter.selector';
import { useFetchTeamByIdQuery } from '../../client/fantasy-baseball.client';
import {
  BaseballLineupCard,
  BaseballPlayerProjectionTable,
  BaseballPlayerStatsTable,
} from '../../components';
import {
  selectPlayerIds,
  selectStartingBatterFangraphIds,
  selectTeamStartingBatterList,
  selectTeamStartingPitcherList,
} from '../../selectors/baseball-team-roster.selector';

export function BaseballTeam() {
  const dispatch = useDispatch();

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

  const playerSportsUiIdList = useSelector(selectPlayerIds);
  const startingBatters = useSelector(selectTeamStartingBatterList);
  const startingPitchers = useSelector(selectTeamStartingPitcherList);
  const fangraphsPlayers = useSelector(selectFangraphsPlayerEntities);
  const mappedPlayerIds = useSelector(selectStartingBatterFangraphIds);
  const getStatSplitPeriod = useSelector(selectStatSplitPeriod);

  const projectionsFilter: FangraphsPlayerProjectionsRequestBody = {
    type: FangraphsProjection.RestOfSeasonTheBatX,
    team: FangraphsTeam.AllTeams,
    pos: FangraphsPosition.All,
    players: mappedPlayerIds,
  };

  useEffect(() => {}, []);

  // const { data: fangraphsProj, isLoading: isFangraphsProjectionsLoading } =
  //   useGetFangraphProjectionsQuery(projectionsFilter);

  // const fangraphsProjections = fangraphsProj?.reduce(
  //   (acc, player) => {
  //     const id = `name=${normalizeName(player.PlayerName)}~team=${player.Team ? FangraphsTeamToEspnTeam[player.Team].toLowerCase() : ''}`;
  //     acc[id] = { ...player };
  //     return acc;
  //   },
  //   {} as Record<string, unknown>
  // );

  // const espnToFangraphsStartingBatters = mapFangraphsPlayersToBaseballTeam(
  //   startingBatters,
  //   fangraphsProjections as Record<string, FangraphsPlayerProjectionEntity>
  // );

  // const fangraphIds = espnToFangraphsStartingBatters?.map(player =>
  //   Number(
  //     (player?.fangraphsProjection as FangraphsPlayerProjectionEntity)?.playerid
  //   )
  // );

  const statsFilter: FangraphsPlayerStatsRequestBody = {
    team: FangraphsTeam.AllTeams,
    pos: FangraphsPosition.All,
    players: mappedPlayerIds,
    meta: {
      pageitems: DEFAULT_PAGE_SIZE,
      pagenum: DEFAULT_PAGE_NUMBER,
    },
    statSplitPeriod: getStatSplitPeriod,
  };

  const { data: fangraphsStats, isLoading: isFangraphsStatsLoading } =
    useGetFangraphStatsQuery(statsFilter);

  const { data: statPeriodList, isLoading: statPeriodLoading } =
    useGetStatPeriodSplitOptionsQuery();

  const [refetch] = useRefetchStatsMutation();

  function handleStatPeriodChange(value: any) {
    dispatch(setStatSplitPeriod(value));

    refetch();
  }

  if (
    isLoading &&
    // isFangraphsProjectionsLoading &&
    isFangraphsStatsLoading &&
    statPeriodLoading
  )
    return <div className="animate-pulse">Loading...</div>;

  const statPeriodOptions = statPeriodList ?? [];

  return (
    <div key={team?.id}>
      <div className="grid sm:grid-cols-1 grid-cols-3 text-left mb-5 mt-5">
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

      <div className="flex flex-wrap text-left">
        <div className="w-full xl:px-4 xl:w-4/12">
          <div className="font-bold">Starting Batters</div>
          <BaseballLineupCard players={startingBatters} />
          <div className="py-3"></div>
          <div className="font-bold">Starting Pitchers</div>
          <BaseballLineupCard players={startingPitchers} />
        </div>

        <div className="w-full xl:px-4 xl:w-8/12">
          <div>
            <div className="my-3">Season</div>
            <div>
              <div className="flex justify-center">
                <SelectComponent
                  label="Stat Split"
                  options={statPeriodList ?? []}
                  onHandleOptionChange={handleStatPeriodChange}
                />
              </div>
            </div>
            <BaseballPlayerStatsTable data={fangraphsStats?.data ?? []} />
          </div>
          <div>
            <div className="my-3">Rest of Season</div>
            <BaseballPlayerProjectionTable data={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
