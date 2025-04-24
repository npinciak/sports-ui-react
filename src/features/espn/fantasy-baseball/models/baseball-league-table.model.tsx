import { GridColDef } from '@mui/x-data-grid/models';
import { BaseballStat } from '@sdk/espn-client-models/baseball/stats/mlb-stats.model';
import { Link } from 'react-router-dom';
import { BaseballTeamNoRosterEntity } from './baseball-team.model';

const COLUMN_CONFIG: Partial<GridColDef> = {
  align: 'right',
  headerAlign: 'right',
  sortable: true,
};

export const LEAGUE_STATS_TABLE_COLUMNS: GridColDef<BaseballTeamNoRosterEntity>[] =
  [
    {
      field: 'Rank',
      valueGetter: (_, { currentRank }) => currentRank,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 250,
      valueGetter: (_, { name }) => name,
      renderCell: ({ row }) => {
        return (
          <div className="flex items-center">
            <img src={row.logo} alt={row.name} className="w-8 h-8 mr-2" />
            <Link to={`team/${row.id}`}>{row.name}</Link>
          </div>
        );
      },
    },
    {
      field: `${BaseballStat.R}`,
      headerName: 'R',
      valueGetter: (_, { valuesByStat }) => valuesByStat[BaseballStat.R],
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.RBI}`,
      headerName: 'RBI',
      valueGetter: (_, { valuesByStat }) => valuesByStat[BaseballStat.RBI],
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.HR}`,
      headerName: 'HR',
      valueGetter: (_, { valuesByStat }) => valuesByStat[BaseballStat.HR],
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.SB}`,
      headerName: 'SB',
      valueGetter: (_, { valuesByStat }) => valuesByStat[BaseballStat.SB],
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.AVG}`,
      headerName: 'AVG',
      valueGetter: (_, { valuesByStat }) =>
        valuesByStat[BaseballStat.AVG].toFixed(3),
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.K}`,
      headerName: 'K',
      valueGetter: (_, { valuesByStat }) => valuesByStat[BaseballStat.K],
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.W}`,
      headerName: 'W',
      valueGetter: (_, { valuesByStat }) => valuesByStat[BaseballStat.W],
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.SV}`,
      headerName: 'SV',
      valueGetter: (_, { valuesByStat }) => valuesByStat[BaseballStat.SV],
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.HD}`,
      headerName: 'HD',
      valueGetter: (_, { valuesByStat }) => valuesByStat[BaseballStat.HD],
      ...COLUMN_CONFIG,
    },
    {
      field: `${BaseballStat.ERA}`,
      headerName: 'ERA',
      valueGetter: (_, { valuesByStat }) =>
        valuesByStat[BaseballStat.ERA].toFixed(3),
    },
  ];
