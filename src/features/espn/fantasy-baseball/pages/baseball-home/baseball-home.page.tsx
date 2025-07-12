import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid2';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BarChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import {
  BaseballStat,
  MLB_STATS_MAP,
} from '@sdk/espn-client-models/baseball/stats';
import { WidgetCard } from '@shared/components/widget-card.component';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { EspnFantasyClientV3 } from '../../../client/espn-fantasy-v3.client';
import { BaseballLeagueHeader } from '../../components/baseball-league-header.component';
import { BaseballSeasonCompletedPctWidget } from '../../components/baseball-season-completed-pct-widget.component';
import { BaseballTradeablesWidget } from '../../components/baseball-tradeables-widget.component';
import { BaseballTransactionsLockWidget } from '../../components/baseball-transactions-lock-widget.component';
import { BaseballTransactionsWidget } from '../../components/baseball-transactions-widget/baseball-transactions-widget.component';
import { LEAGUE_STATS_TABLE_COLUMNS } from '../../models/baseball-league-table.model';
import { selectFirstGameOfDay } from '../../selectors/baseball-events.selector';
import { selectSeasonCompletedPct } from '../../selectors/baseball-league.selector';
import {
  getTeamDropTotals,
  getTeamMoveToActive,
  getTeamMoveToInjuredReserve,
  getTeamsWithTradeablePlayers,
  getTeamsWithTradeablePlayersCount,
} from '../../selectors/baseball-team.selector';
import { getGroupedTransactions } from '../../selectors/baseball-transaction.selector';

export function BaseballHome() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  const firstGame = useSelector(selectFirstGameOfDay);

  const firstEventDate = firstGame.timestamp;

  const [selectedGraphStat, setSelectedGraphStat] = useState(BaseballStat.K);

  const { data } = EspnFantasyClientV3.useGetBaseballLeagueQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });

  const teamsWithTradeablePlayersCount = useSelector(
    getTeamsWithTradeablePlayersCount
  );

  const teamsWithTradeablePlayers = useSelector(getTeamsWithTradeablePlayers);
  const totalLeagueDropTotal = useSelector(getTeamDropTotals);
  const totalTeamMoveToActive = useSelector(getTeamMoveToActive);
  const totalTeamMoveToInjuredReserve = useSelector(
    getTeamMoveToInjuredReserve
  );

  const transactionsByDate = useSelector(getGroupedTransactions);

  const seasonCompletedPct = useSelector(selectSeasonCompletedPct);

  const dataSource = data?.teams ?? [];

  const graphData = dataSource
    .map(team => ({
      value: team.valuesByStat[selectedGraphStat],
      label: team.name,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <>
      <BaseballLeagueHeader isLoading={false} league={data} />
      <Grid container spacing={3} className="my-4">
        <Grid size={12}>
          <WidgetCard
            title={`${MLB_STATS_MAP[selectedGraphStat].description} by team`}
          >
            <BarChart
              height={300}
              series={[
                {
                  data: graphData.map(({ value }) => value),
                  type: 'bar',
                  color: '#3F88C5',
                },
              ]}
              xAxis={[
                {
                  data: graphData.map(({ label }) => label),
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
      <Grid container spacing={3} className="mb-4">
        <Grid size={{ xs: 12, sm: 4 }}>
          <BaseballTradeablesWidget
            teamsWithTradeablePlayersCount={teamsWithTradeablePlayersCount}
            teamsWithTradeablePlayers={teamsWithTradeablePlayers}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <BaseballSeasonCompletedPctWidget
            seasonCompletedPct={seasonCompletedPct}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <WidgetCard
            title="Roster Drops"
            value={totalLeagueDropTotal}
            isEmpty={true}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <WidgetCard
            title="Active roster moves"
            value={totalTeamMoveToActive}
            isEmpty={true}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <WidgetCard
            title="To Injured Reserve"
            value={totalTeamMoveToInjuredReserve}
            isEmpty={true}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <BaseballTransactionsLockWidget event={firstGame} />
        </Grid>
        <Grid size={12}>
          <BaseballTransactionsWidget
            transactions={transactionsByDate}
            title="League Transactions"
          />
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <DataGrid
                getRowId={row => row.id}
                rows={dataSource}
                columns={LEAGUE_STATS_TABLE_COLUMNS}
                sx={{ border: 0 }}
                disableColumnMenu={true}
                hideFooterPagination={true}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
