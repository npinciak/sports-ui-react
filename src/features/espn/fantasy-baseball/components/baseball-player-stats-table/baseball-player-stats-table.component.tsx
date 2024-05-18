import ReactDataGrid from '@inovua/reactdatagrid-community';
import {
  TypeColumn,
  TypeSortInfo,
} from '@inovua/reactdatagrid-community/types';
import { FangraphsPlayerStatEntity } from '../../../../../@shared/fangraphs';

export function BaseballPlayerStatsTable({
  data,
}: {
  data: FangraphsPlayerStatEntity[];
}) {
  const defaultSortInfo: TypeSortInfo = [];

  const columns: TypeColumn[] = [
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
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.H,
    },
    {
      name: 'PA',
      header: 'PA',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.PA,
    },
    {
      name: 'HR',
      header: 'HR',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.HR,
    },
    {
      name: 'R',
      header: 'R',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.R,
    },
    {
      name: 'RBI',
      header: 'RBI',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) => data?.RBI,
    },
    {
      name: 'AVG',
      header: 'AVG',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
        data?.AVG.toFixed(3),
    },
    {
      name: 'BABIP',
      header: 'BABIP',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
        data?.BABIP.toFixed(3),
    },
    {
      name: 'BABIP',
      header: 'BABIP+',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
        data?.['BABIP+'].toFixed(3),
    },
    {
      name: 'WAR',
      header: 'WAR',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
        data?.WAR.toFixed(3),
    },
    {
      name: 'wOBA',
      header: 'wOBA',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
        data?.wOBA.toFixed(3),
    },
    {
      name: 'wRC+',
      header: 'wRC+',
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerStatEntity }) =>
        data?.['wRC+'].toFixed(3),
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
