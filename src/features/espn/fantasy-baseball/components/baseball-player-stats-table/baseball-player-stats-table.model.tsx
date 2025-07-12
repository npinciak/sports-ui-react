import { Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { FangraphsPlayerStatEntity } from '@shared/fangraphs/models/player-stats.model';
import {
  BATTER_FILTERS,
  PITCHER_FILTERS,
} from '../../models/stat-filters.model';

const COLUMN_CONFIG: Partial<GridColDef> = {
  align: 'right',
  headerAlign: 'right',
};

export const BATTER_BASIC_STATS_TABLE_COLUMNS: GridColDef<FangraphsPlayerStatEntity>[] =
  [
    {
      field: 'PlayerName',
      headerName: 'Name',
      minWidth: 175,
      sortable: false,
    },
    {
      field: 'H',
      headerName: 'H',
      ...COLUMN_CONFIG,
    },
    {
      field: 'AB',
      headerName: 'AB',
      ...COLUMN_CONFIG,
    },
    {
      field: 'HR',
      headerName: 'HR',
      ...COLUMN_CONFIG,
    },
    {
      field: 'R',
      headerName: 'R',
      ...COLUMN_CONFIG,
    },
    {
      field: 'RBI',
      headerName: 'RBI',
      ...COLUMN_CONFIG,
    },
    {
      field: 'SB',
      headerName: 'SB',
      ...COLUMN_CONFIG,
    },
    {
      field: 'AVG',
      headerName: 'AVG',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(3) : '-'),
    },
  ];

export const BATTER_ADVANCED_STATS_TABLE_COLUMNS: GridColDef<FangraphsPlayerStatEntity>[] =
  [
    {
      field: 'PlayerName',
      headerName: 'Name',
      minWidth: 175,
      sortable: false,
    },
    {
      field: 'BABIP+',
      headerName: 'BABIP+',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(2) : '-'),
    },
    {
      field: 'WAR',
      headerName: 'WAR',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(2) : '-'),
    },
    {
      field: 'wOBA',
      headerName: 'wOBA',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(3) : '-'),
    },
    {
      field: 'xwOBA',
      headerName: 'xwOBA',
      ...COLUMN_CONFIG,
      renderCell: ({ value, row }) => {
        const wOba = row.wOBA ? row.wOBA : 0;

        return        <div>diff{value ? (value - wOba).toFixed(3) : 0}</div>;
      },
    },
    {
      field: 'LA',
      headerName: 'Launch Angle',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(1) : '-'),
    },
    {
      field: 'EV',
      headerName: 'Exit Velocity',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(1) : '-'),
    },
    {
      field: 'Barrel%',
      headerName: 'Barrel%',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? (value * 100)?.toFixed(2) : '-'),
    },
    {
      field: 'Swing%',
      headerName: 'Swing%',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? (value * 100)?.toFixed(2) : '-'),
    },
    {
      field: 'O-Swing%',
      headerName: 'O-Swing%',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? (value * 100)?.toFixed(2) : '-'),
    },

    {
      field: 'SwStr%',
      headerName: 'SwStr%',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? (value * 100)?.toFixed(2) : '-'),
    },
    {
      field: 'wRC+',
      headerName: 'wRC+',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (
        <Tooltip
          title={
            value > 120
              ? 'Player is batting 20% better than the league average'
              : ''
          }
          children={value ? value?.toFixed(0) : '-'}
        />
      ),
    },
  ];

export const PITCHER_BASIC_STATS_TABLE_COLUMNS: GridColDef<FangraphsPlayerStatEntity>[] =
  [
    {
      field: 'PlayerName',
      headerName: 'Name',
      minWidth: 175,
      sortable: false,
    },
    {
      field: 'W',
      headerName: 'W',
      ...COLUMN_CONFIG,
    },
    {
      field: 'L',
      headerName: 'L',
      ...COLUMN_CONFIG,
    },
    {
      field: 'SV',
      headerName: 'SV',
      ...COLUMN_CONFIG,
    },
    {
      field: 'HLD',
      headerName: 'HLD',
      ...COLUMN_CONFIG,
    },
    {
      field: 'SO',
      headerName: 'SO',
      ...COLUMN_CONFIG,
    },
    {
      field: 'R',
      headerName: 'R',
      ...COLUMN_CONFIG,
    },
    {
      field: 'BB',
      headerName: 'BB',
      ...COLUMN_CONFIG,
    },
    {
      field: 'H',
      headerName: 'H',
      ...COLUMN_CONFIG,
    },
    {
      field: 'ERA',
      headerName: 'ERA',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(3) : '-'),
    },
    {
      field: 'xERA',
      headerName: 'xERA',
      ...COLUMN_CONFIG,
    },
    {
      field: 'K%',
      headerName: 'K%',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? (value * 100)?.toFixed(2) : '-'),
    },
    {
      field: 'BB%',
      headerName: 'BB%',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? (value * 100)?.toFixed(2) : '-'),
    },
    {
      field: 'K/9',
      headerName: 'K/9',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(3) : '-'),
    },
    {
      field: 'BB/9',
      headerName: 'BB/9',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(3) : '-'),
    },
    {
      field: 'G',
      headerName: 'Games',
      ...COLUMN_CONFIG,
    },
    {
      field: 'IP',
      headerName: 'IP',
      ...COLUMN_CONFIG,
    },
  ];

export const PITCHER_ADVANCED_STATS_TABLE_COLUMNS: GridColDef<FangraphsPlayerStatEntity>[] =
  [
    {
      field: 'PlayerName',
      headerName: 'Name',
      minWidth: 175,
      sortable: false,
    },
    {
      field: 'FIP',
      headerName: 'FIP',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(2) : '-'),
    },
    {
      field: 'xFIP',
      headerName: 'xFIP',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(2) : '-'),
    },
    {
      field: 'tERA',
      headerName: 'tERA',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(2) : '-'),
    },
    {
      field: 'BABIP',
      headerName: 'BABIP',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(2) : '-'),
    },
    {
      field: 'LOB%',
      headerName: 'LOB%',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(2) * 100 : '-'),
    },
    {
      field: 'Dollars',
      headerName: '$',
      ...COLUMN_CONFIG,
      renderCell: ({ value }) => (value ? value?.toFixed(2) : '-'),
    },
  ];

export const BATTER_TABLE_COLUMNS_BY_TYPE = {
  [BATTER_FILTERS.Basic]: BATTER_BASIC_STATS_TABLE_COLUMNS,
  [BATTER_FILTERS.Advanced]: BATTER_ADVANCED_STATS_TABLE_COLUMNS,
  [BATTER_FILTERS.BattedBall]: [],
};

export const PITCHER_TABLE_COLUMNS_BY_TYPE = {
  [PITCHER_FILTERS.Basic]: PITCHER_BASIC_STATS_TABLE_COLUMNS,
  [PITCHER_FILTERS.Advanced]: PITCHER_ADVANCED_STATS_TABLE_COLUMNS,
  [PITCHER_FILTERS.BattedBall]: [],
  [PITCHER_FILTERS.StrikeoutWalkRates]: [],
  [PITCHER_FILTERS.HomerunRates]: [],
};
