import {
  TypeColumn,
  TypeSortInfo,
} from '@inovua/reactdatagrid-community/types';
import { FangraphsPlayerProjectionEntity } from '@shared/fangraphs';

export function BaseballPlayerProjectionTable({
  data,
}: {
  data: FangraphsPlayerProjectionEntity[];
}) {
  const defaultSortInfo: TypeSortInfo = [];

  const columns: TypeColumn[] = [
    {
      name: 'PlayerName',
      header: 'Name',
      minWidth: 175,
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) => (
        <>
          <div className="col">
            <div>{data.PlayerName}</div>
          </div>
        </>
      ),
    },
    {
      name: 'H',
      header: 'H',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.H.toFixed(2),
    },
    {
      name: 'PA',
      header: 'PA',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.PA.toFixed(2),
    },
    {
      name: 'HR',
      header: 'HR',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.HR.toFixed(2),
    },
    {
      name: 'R',
      header: 'R',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.R.toFixed(2),
    },
    {
      name: 'RBI',
      header: 'RBI',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.RBI.toFixed(2),
    },
    {
      name: 'AVG',
      header: 'AVG',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.AVG.toFixed(3),
    },
    {
      name: 'BABIP',
      header: 'BABIP',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data.BABIP.toFixed(3),
    },
    {
      name: 'WAR',
      header: 'WAR',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.WAR.toFixed(3),
    },
    {
      name: 'wOBA',
      header: 'wOBA',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.wOBA.toFixed(3),
    },
    {
      name: 'wRC+',
      header: 'wRC+',
      defaultFlex: 1,
      sortable: true,
      type: 'number',
      render: ({ data }: { data: FangraphsPlayerProjectionEntity }) =>
        data?.['wRC+'].toFixed(3),
    },
  ];

  const gridStyle = { minHeight: 500 };
  return <></>;
}
