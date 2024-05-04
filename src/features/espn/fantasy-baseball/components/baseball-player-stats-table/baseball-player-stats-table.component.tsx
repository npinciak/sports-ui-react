import ReactDataGrid from '@inovua/reactdatagrid-community';
import {
  TypeColumn,
  TypeSortInfo,
} from '@inovua/reactdatagrid-community/types';
import { Link } from 'react-router-dom';
import { BaseballStat } from 'sports-ui-sdk';
import { BaseballPlayerStatsRow } from '../../models/baseball-player.model';

export function BaseballPlayerStatsTable({
  data,
}: {
  data: BaseballPlayerStatsRow[];
}) {
  const defaultSortInfo: TypeSortInfo = [];

  const columns: TypeColumn[] = [
    {
      name: 'name',
      header: 'Name',
      minWidth: 250,
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: BaseballPlayerStatsRow }) => (
        <Link to={`/player/${data.id}`}>{data?.name}</Link>
      ),
    },
    {
      header: 'H',
      minWidth: 100,
      defaultFlex: 1,
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.H],
      type: 'number',
      sortable: true,
    },
    {
      header: 'AB',
      minWidth: 100,
      defaultFlex: 1,
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.AB],
      type: 'number',
      sortable: true,
    },
    {
      header: 'R',
      minWidth: 100,
      defaultFlex: 1,
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.R],
      type: 'number',
      sortable: true,
    },
    {
      header: 'RBI',
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.RBI],
      type: 'number',
      sortable: true,
    },
    {
      header: 'HR',
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.HR],
      type: 'number',
      sortable: true,
    },
    {
      header: 'SB',
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.SB],
      type: 'number',
      sortable: true,
    },
    {
      header: 'AVG',
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.AVG],
      type: 'number',
      sortable: true,
    },
    {
      header: 'OBP',
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.OBP],
      type: 'number',
      sortable: true,
    },
    {
      header: 'OPS',
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.OPS],
      type: 'number',
      sortable: true,
    },
    {
      header: 'ISO',
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.stats[BaseballStat.ISO],
      type: 'number',
      sortable: true,
    },
    {
      header: 'wOBA',
      render: ({ data }: { data: BaseballPlayerStatsRow }) => null,
      type: 'number',
      sortable: true,
    },
    {
      header: 'wRC',
      render: ({ data }: { data: BaseballPlayerStatsRow }) => null,
      type: 'number',
      sortable: true,
    },
    {
      header: 'wRAA',
      render: ({ data }: { data: BaseballPlayerStatsRow }) => null,
      type: 'number',
      sortable: true,
    },
    {
      header: 'wRC',
      render: ({ data }: { data: BaseballPlayerStatsRow }) => null,
      type: 'number',
      sortable: true,
    },
    {
      header: 'percentChange',
      render: ({ data }: { data: BaseballPlayerStatsRow }) =>
        data.percentChange,
      type: 'number',
      sortable: true,
    },
    {
      header: 'percentOwned',
      render: ({ data }: { data: BaseballPlayerStatsRow }) => data.percentOwned,
      type: 'number',
      sortable: true,
    },
  ];

  const gridStyle = { minHeight: 500 };
  return (
    <ReactDataGrid
      idProperty="id"
      defaultSortInfo={defaultSortInfo}
      columns={columns}
      dataSource={data}
      style={gridStyle}
    />
  );
}
