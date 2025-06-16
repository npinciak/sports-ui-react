import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BarChart } from '@mui/x-charts';
import { SelectComponent } from '@shared/components';
import { WidgetCard } from '@shared/components/widget-card.component';
import { setStatSplitPeriod } from '@shared/fangraphs';
import {
  useGetFangraphStatsQuery,
  useGetStatPeriodSplitOptionsQuery,
  useRefetchStatsMutation,
} from '@shared/fangraphs/client/fangraphs.client';
import {
  FangraphsPlayerStatEntity,
  FangraphsPlayerStatsRequest,
} from '@shared/fangraphs/models';
import { selectStatSplitPeriod } from '@shared/fangraphs/selectors/stats-filter.selector';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { COLOR } from 'src/app.theme';
import { RouteBuilder } from 'src/core/routes/route-builder';
import { EspnFantasyClientV3 } from '../../../client/espn-fantasy-v3.client';
import { BaseballLineupCard, BaseballPlayerStatsTable } from '../../components';
import { BaseballInjuryWidget } from '../../components/baseball-injury-widget.component';
import {
  BATTER_TABLE_COLUMNS_BY_TYPE,
  PITCHER_BASIC_STATS_TABLE_COLUMNS,
} from '../../components/baseball-player-stats-table/baseball-player-stats-table.model';
import { BaseballTeamHeader } from '../../components/baseball-team-header.component';
import { EmptyWidgetState } from '../../components/baseball-team-widget/widget-empty.component';
import { WidgetHeader } from '../../components/baseball-team-widget/widget-header.component';
import { BATTER_FILTERS } from '../../models/stat-filters.model';
import {
  selectInjuryPlayerList,
  selectPitcherFangraphIds,
  selectStartingBatterFangraphIds,
  selectStartingBattersNotInLineup,
  selectStartingTeamBenchBatters,
  selectStartingTeamBenchPitchers,
  selectTeamBenchBatterListWithEvents,
  selectTeamBenchPitcherListWithEvents,
  selectTeamStartingBatterListWithEvents,
  selectTeamStartingPitcherListWithEvents,
} from '../../selectors/baseball-team-roster.selector';

export function BaseballTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedStatFilter, setSelectedStatFilter] = useState(
    '+WPA' as string
  );

  const [batterStatFilter, setBatterStatFilter] = useState<string>(
    BATTER_FILTERS.Basic
  );

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

  const injuryPlayerList = useSelector(selectInjuryPlayerList);

  const mappedStartingBatterPlayerIds = useSelector(
    selectStartingBatterFangraphIds
  );

  const mappedStartingPitcherPlayerIds = useSelector(selectPitcherFangraphIds);
  const getStatSplitPeriod = useSelector(selectStatSplitPeriod);

  const teamStartingBatterListWithEvents = useSelector(
    selectTeamStartingBatterListWithEvents
  );

  const teamStartingBattersNotInLineup = useSelector(
    selectStartingBattersNotInLineup
  );

  const teamBenchPlayerListWithEvents = useSelector(
    selectTeamBenchBatterListWithEvents
  );

  const teamStartingPitcherListWithEvents = useSelector(
    selectTeamStartingPitcherListWithEvents
  );

  const startingTeamBenchPitchers = useSelector(
    selectStartingTeamBenchPitchers
  );

  const teamBenchPitcherListWithEvents = useSelector(
    selectTeamBenchPitcherListWithEvents
  );

  const startingTeamBenchBatters = useSelector(selectStartingTeamBenchBatters);

  const startingBenchBattersCount = startingTeamBenchBatters.length;
  const startingBenchPitchersCount = startingTeamBenchPitchers.length;

  const hasStartingBenchPitchers = startingBenchPitchersCount > 0;
  const hasStartingBenchBatters = startingBenchBattersCount > 0;

  const { data: fangraphsBatterStats, isLoading: isFangraphsStatsLoading } =
    useGetFangraphStatsQuery({
      ...FangraphsPlayerStatsRequest.requestBody,
      players: mappedStartingBatterPlayerIds,
      month: getStatSplitPeriod.toString(),
    });

  const { data: fangraphsPitcherStats } = useGetFangraphStatsQuery({
    ...FangraphsPlayerStatsRequest.requestBody,
    stats: 'pit',
    players: mappedStartingPitcherPlayerIds,
    month: getStatSplitPeriod.toString(),
  });

  const { data: statPeriodList, isLoading: statPeriodLoading } =
    useGetStatPeriodSplitOptionsQuery();

  const [refetch, { data }] = useRefetchStatsMutation();

  function handleStatPeriodChange(value: any) {
    dispatch(setStatSplitPeriod(value));

    refetch();
  }

  function handlePlayerClick(playerId: string) {
    navigate(
      playerByIdRoute({ leagueId, sport: 'baseball', season: year, playerId })
    );
  }

  const statsDropdownOptions = Object.keys(fangraphsBatterStats?.data[0] ?? {});

  const loading = isLoading || isFangraphsStatsLoading || statPeriodLoading;

  return (
    <div key={team?.id}>
      <BaseballTeamHeader team={team} isLoading={loading} leagueId={leagueId} />

      <Grid container spacing={3} marginBottom={3} width="100%">
        <Grid size={{ xs: 12, sm: 4 }}>
          <BaseballInjuryWidget injuryPlayerList={injuryPlayerList} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={2}>
            <WidgetHeader
              title="Benched Pitchers"
              count={startingBenchPitchersCount}
            />
            <Divider />
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              {hasStartingBenchPitchers ? (
                <>
                  {startingTeamBenchPitchers.map(player => (
                    <BaseballLineupCard
                      key={player.id}
                      player={player}
                      onClick={handlePlayerClick}
                    />
                  ))}
                </>
              ) : (
                <EmptyWidgetState title="No starting pitchers on the bench" />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={2}>
            <WidgetHeader
              title="Benched Batters"
              count={startingBenchBattersCount}
            />
            <Divider />
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              {hasStartingBenchBatters ? (
                <>
                  {startingTeamBenchBatters.map(player => (
                    <BaseballLineupCard
                      key={player.id}
                      player={player}
                      onClick={handlePlayerClick}
                    />
                  ))}
                </>
              ) : (
                <EmptyWidgetState title="No starting batters on the bench" />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card elevation={2}>
            <WidgetHeader
              title="Starting Batters not playing"
              count={teamStartingBattersNotInLineup.length}
            />
            <Divider />
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              {teamStartingBattersNotInLineup.length > 0 ? (
                <>
                  {teamStartingBattersNotInLineup.map(player => (
                    <BaseballLineupCard
                      key={player.id}
                      player={player}
                      onClick={handlePlayerClick}
                    />
                  ))}
                </>
              ) : (
                <EmptyWidgetState title="All batters playing" />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <WidgetCard title={` by player`}>
            <SelectComponent
              options={statsDropdownOptions.map(stat => ({
                label: stat,
                value: stat,
              }))}
              onHandleOptionChange={setSelectedStatFilter}
            />
            <BarChart
              height={300}
              series={[
                {
                  data:
                    fangraphsBatterStats?.data.map(value => {
                      const stat =
                        value[
                          selectedStatFilter as keyof FangraphsPlayerStatEntity
                        ];

                      if (!stat) return null;
                      if (typeof stat === 'string') return null;

                      return stat;
                    }) ?? [],
                  type: 'bar',
                  color: COLOR.MODERN_BLUE,
                },
              ]}
              xAxis={[
                {
                  data:
                    fangraphsBatterStats?.data.map(
                      ({ PlayerName }) => PlayerName
                    ) ?? [],
                  scaleType: 'band',
                },
              ]}
              borderRadius={20}
              axisHighlight={{ y: 'line' }}
              loading={false}
            />
          </WidgetCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} marginBottom={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card className="mb-5">
            <CardContent>
              <List>
                {teamStartingBatterListWithEvents.map(player => (
                  <ListItem disablePadding key={player.id}>
                    <ListItemButton>
                      <ListItemText
                        children={
                          <BaseballLineupCard
                            player={player}
                            onClick={handlePlayerClick}
                          />
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginTop: 2 }}>Bench</Divider>
              <List>
                {teamBenchPlayerListWithEvents.map(player => (
                  <ListItem disablePadding key={player.id}>
                    <ListItemButton>
                      <ListItemText
                        children={
                          <BaseballLineupCard
                            player={player}
                            onClick={handlePlayerClick}
                          />
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <List>
                {teamStartingPitcherListWithEvents.map(player => (
                  <ListItem disablePadding key={player.id}>
                    <ListItemButton>
                      <ListItemText
                        children={
                          <BaseballLineupCard
                            player={player}
                            onClick={handlePlayerClick}
                          />
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginTop: 2 }}>Bench</Divider>
              <List>
                {teamBenchPitcherListWithEvents.map(player => (
                  <ListItem disablePadding key={player.id}>
                    <ListItemButton>
                      <ListItemText
                        children={
                          <BaseballLineupCard
                            player={player}
                            onClick={handlePlayerClick}
                          />
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Card className="mb-5">
            <CardContent>
              <Grid size={{ xs: 12 }} marginBottom={3}>
                <div className="my-3">Batters</div>
                <div className="my-3">
                  <div className="flex justify-center">
                    <SelectComponent
                      options={statPeriodList ?? []}
                      onHandleOptionChange={handleStatPeriodChange}
                    />
                  </div>
                </div>
              </Grid>

              <Grid size={{ xs: 12 }} marginBottom={3} sx={{ width: '100%' }}>
                <ButtonGroup sx={{ width: '100%' }}>
                  <Button
                    onClick={() => setBatterStatFilter(BATTER_FILTERS.Basic)}
                  >
                    Basic
                  </Button>
                  <Button
                    onClick={() => setBatterStatFilter(BATTER_FILTERS.Advanced)}
                  >
                    Advanced
                  </Button>
                  <Button
                    disabled
                    onClick={() =>
                      setBatterStatFilter(BATTER_FILTERS.BattedBall)
                    }
                  >
                    Batted Ball
                  </Button>
                </ButtonGroup>
              </Grid>

              <BaseballPlayerStatsTable
                data={fangraphsBatterStats?.data ?? []}
                basicStatsColumns={
                  BATTER_TABLE_COLUMNS_BY_TYPE[batterStatFilter]
                }
                isLoading={loading}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="my-3">Pitchers</div>
              <div className="my-3">
                <div className="flex justify-center">
                  <SelectComponent
                    options={statPeriodList ?? []}
                    onHandleOptionChange={handleStatPeriodChange}
                  />
                </div>
              </div>
              <BaseballPlayerStatsTable
                data={fangraphsPitcherStats?.data ?? []}
                basicStatsColumns={PITCHER_BASIC_STATS_TABLE_COLUMNS}
                isLoading={loading}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
