import { RouteBuilder } from '@/core/routes/route-builder';
import { SelectComponent } from '@shared/components';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  FangraphsPlayerProjectionsRequestBody,
  FangraphsPlayerStatsRequestBody,
  FangraphsProjection,
  FangraphsTeam,
  setStatSplitPeriod,
} from '@shared/fangraphs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetFangraphProjectionsQuery,
  useGetFangraphStatsQuery,
  useGetStatPeriodSplitOptionsQuery,
  useRefetchStatsMutation,
} from '../../../../../@shared/fangraphs/client/fangraphs.client';
import { FangraphsPosition } from '../../../../../@shared/fangraphs/models';
import { selectFangraphsPlayerEntities } from '../../../../../@shared/fangraphs/selectors';
import { selectStatSplitPeriod } from '../../../../../@shared/fangraphs/selectors/stats-filter.selector';
import { EspnFantasyClientV3 } from '../../../client/espn-fantasy-v3.client';
import {
  BaseballLineupCard,
  BaseballPlayerProjectionTable,
  BaseballPlayerStatsTable,
} from '../../components';
import { BaseballTeamHeader } from '../../components/baseball-team-header/baseball-team-header.component';
import {
  selectPlayerIds,
  selectStartingBatterFangraphIds,
  selectTeamStartingBatterList,
  selectTeamStartingBatterListWithEvents,
  selectTeamStartingPitcherList,
  selectTeamStartingPitcherListWithEvents,
} from '../../selectors/baseball-team-roster.selector';

export function BaseballTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { playerByIdRoute } = RouteBuilder();

  const { year, leagueId, teamId } = useParams<{
    year: string;
    leagueId: string;
    teamId: string;
  }>();

  const { data: team, isLoading } =
    EspnFantasyClientV3.useGetBaseballTeamByIdQuery({
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

  const teamStartingBatterListWithEvents = useSelector(
    selectTeamStartingBatterListWithEvents
  );

  const teamStartingPitcherListWithEvents = useSelector(
    selectTeamStartingPitcherListWithEvents
  );

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

  const { data: fangraphsProj, isLoading: isFangraphsProjectionsLoading } =
    useGetFangraphProjectionsQuery(projectionsFilter);

  const { data: statPeriodList, isLoading: statPeriodLoading } =
    useGetStatPeriodSplitOptionsQuery();

  const [refetch] = useRefetchStatsMutation();

  function handleStatPeriodChange(value: any) {
    dispatch(setStatSplitPeriod(value));

    refetch();
  }

  function handlePlayerClick(playerId: string) {
    navigate(
      playerByIdRoute({ leagueId, sport: 'baseball', season: year, playerId })
    );
  }

  const loading = isLoading || isFangraphsStatsLoading || statPeriodLoading;

  return (
    <div key={team?.id}>
      <BaseballTeamHeader team={team} isLoading={loading} />

      <div className="flex flex-wrap text-left">
        <div className="w-full xl:px-4 xl:w-3/12">
          <div className="font-bold">Starting Batters</div>
          {teamStartingBatterListWithEvents.map(player => (
            <BaseballLineupCard player={player} onClick={handlePlayerClick} />
          ))}
          <div className="py-3"></div>
          <div className="font-bold">Starting Pitchers</div>
          {teamStartingPitcherListWithEvents.map(player => (
            <BaseballLineupCard player={player} onClick={handlePlayerClick} />
          ))}
        </div>

        <div className="w-full xl:px-4 xl:w-9/12">
          <div>
            <div className="my-3">Season</div>
            <div className="my-3">
              <div className="flex justify-center">
                <SelectComponent
                  label=""
                  options={statPeriodList ?? []}
                  onHandleOptionChange={handleStatPeriodChange}
                />
              </div>
            </div>
            <BaseballPlayerStatsTable data={fangraphsStats?.data ?? []} />
          </div>
          <div>
            <div className="my-3">Rest of Season</div>
            <BaseballPlayerProjectionTable data={fangraphsProj ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
