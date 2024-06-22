import {
  TypeColumn,
  TypeSortInfo,
} from '@inovua/reactdatagrid-community/types';
import { FangraphsPlayerStatEntity } from '../../../../../@shared';

const DEFAULT_COLUMN_WIDTH = 100;
export const defaultSortInfo: TypeSortInfo = [];

export const BASEBALL_PLAYER_STATS_TABLE_COLUMNS: TypeColumn[] = [
  {
    name: 'PlayerName',
    header: 'Name',
    minWidth: 175,
    defaultFlex: 1,
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) => (
      <>
        <div className="col">
          <div>{data.PlayerName}</div>
          <div className="text-xs">{data.TeamNameAbb}</div>
        </div>
      </>
    ),
  },
  {
    name: 'H',
    header: 'H',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    sortable: true,
    type: 'number',
    render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.H,
  },
  {
    name: 'PA',
    header: 'PA',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    sortable: true,
    type: 'number',
    render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.PA,
  },
  {
    name: 'HR',
    header: 'HR',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.HR,
  },
  {
    name: 'R',
    header: 'R',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.R,
  },
  {
    name: 'RBI',
    header: 'RBI',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.RBI,
  },
  {
    name: 'SB',
    header: 'SB',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.SB,
  },
  {
    name: 'AVG',
    header: 'AVG',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
      data?.AVG.toFixed(3),
  },

  {
    name: 'BABIP+',
    header: 'BABIP+',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
      data?.['BABIP+'] ? data?.['BABIP+'].toFixed(3) : 0,
  },
  {
    name: 'WAR',
    header: 'WAR',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
      data?.WAR ? data?.WAR.toFixed(3) : 0,
  },
  {
    name: 'wOBA',
    header: 'wOBA',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
      data?.wOBA ? data?.wOBA.toFixed(3) : 0,
  },
  {
    name: 'wRC+',
    header: 'wRC+',
    defaultFlex: 1,
    minWidth: DEFAULT_COLUMN_WIDTH,
    type: 'number',
    sortable: true,
    render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
      data?.['wRC+'].toFixed(3),
  },
];
