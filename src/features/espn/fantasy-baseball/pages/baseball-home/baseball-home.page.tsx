import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models';
import { useParams } from 'react-router-dom';
import { BaseballStat } from 'sports-ui-sdk';
import { BaseballTeam } from '../../models/baseball-team.model';

import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useSelector } from 'react-redux';
import { EspnFantasyClientV3 } from '../../../client/espn-fantasy-v3.client';
import {
  getTeamsWithTradeablePlayers,
  getTeamsWithTradeablePlayersCount,
} from '../../selectors/baseball-team.selector';

export function BaseballHome() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  const { data, isSuccess } = EspnFantasyClientV3.useGetBaseballLeagueQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });

  const teamsWithTradeablePlayersCount = useSelector(
    getTeamsWithTradeablePlayersCount
  );

  const teamsWithTradeablePlayers = useSelector(getTeamsWithTradeablePlayers);

  const columns: GridColDef<Omit<BaseballTeam, 'roster'>>[] = [
    {
      field: 'currentRank',
      headerName: 'Rank',
      sortable: true,
      valueGetter: (_, row) => row.currentRank,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 250,
      valueGetter: (_, row) => row.name,
      renderCell: params => {
        return (
          <div className="flex items-center">
            <img
              src={params.row.logo}
              alt={params.row.name}
              className="w-8 h-8 mr-2"
            />
            <div>{params.row.name}</div>
            {/* <div className="ml-2 text-gray-500">{params.row.abbrev}</div> */}
            {params.row.hasTradeablePlayers && (
              <div className="ml-2 text-red-500">Tradeable</div>
            )}
          </div>
        );
      },
    },
    {
      field: `${BaseballStat.R}`,
      headerName: 'R',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.R],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.RBI}`,
      headerName: 'RBI',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.RBI],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.HR}`,
      headerName: 'HR',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.HR],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.SB}`,
      headerName: 'SB',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.SB],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.AVG}`,
      headerName: 'AVG',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.AVG],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.K}`,
      headerName: 'K',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.K],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.W}`,
      headerName: 'W',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.W],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.SV}`,
      headerName: 'SV',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.SV],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.HD}`,
      headerName: 'HD',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.HD],
      type: 'number',
      sortable: true,
    },
    {
      field: `${BaseballStat.ERA}`,
      headerName: 'ERA',
      valueGetter: (_, row) => row?.valuesByStat[BaseballStat.ERA],
      type: 'number',
      sortable: true,
    },
  ];

  const dataSource = isSuccess ? data.teams : [];

  return (
    <>
      <div className="my-3">{data?.name}</div>
      <div className="my-3">Year: {year}</div>
      <div className="my-3">League ID: {leagueId}</div>
      <div className="my-3">
        <a
          href={`https://fantasy.espn.com/baseball/league?leagueId=${leagueId}`}
          target="_blank"
        >
          Go To league
        </a>
      </div>
      <Grid2 container spacing={3}>
        <Grid2 xs={12} sm={4}>
          <Card>
            <CardContent>
              Teams with Tradeables
              <Typography variant="h3">
                {teamsWithTradeablePlayersCount}
              </Typography>
              {teamsWithTradeablePlayers.map(team => {
                return (
                  <ul key={team.id}>
                    <li>{team.name}</li>
                  </ul>
                );
              })}
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={12} sm={4}>
          <Card>
            <CardContent>
              Total League Transactions
              <Typography variant="h3">
                {teamsWithTradeablePlayersCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={12} sm={4}>
          <Card>
            <CardContent>3</CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <div className="flex mt-2">
        <div className="flex-1">
          {/* {liveStandings.map(team => {
            return (
              <ul key={team.id}>
                <li>
                  {team.team.name} - {team.liveScore}
                </li>
              </ul>
            );
          })} */}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 w-100">
          <Card>
            <CardContent>
              <DataGrid
                rows={dataSource}
                columns={columns}
                sx={{ border: 0 }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
