import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import {
  TypeColumn,
  TypeSortInfo,
} from '@inovua/reactdatagrid-community/types';
import { Link, useParams } from 'react-router-dom';
import { BaseballStat } from 'sports-ui-sdk';
import { EspnFantasyClientV2 } from '../../../client/espn-fantasy-v2.client';
import { EspnFantasyClientV3 } from '../../../client/espn-fantasy-v3.client';
import { BaseballTeam } from '../../models/baseball-team.model';

export function BaseballHome() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  const { data, isSuccess } = EspnFantasyClientV3.useGetBaseballLeagueQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });

  const { data: events } = EspnFantasyClientV2.useGetEventsQuery();

  const defaultSortInfo: TypeSortInfo = [];

  const columns: TypeColumn[] = [
    {
      name: 'name',
      header: 'Name',
      minWidth: 250,
      defaultFlex: 1,
      sortable: true,
      render: ({ data }: { data: BaseballTeam }) => (
        <Link to={`team/${data.id}`}>{data?.name}</Link>
      ),
    },
    {
      name: `${BaseballStat.R}`,
      header: 'R',
      minWidth: 100,
      defaultFlex: 1,
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.R],
      type: 'number',
      sortable: true,
    },
    {
      header: 'RBI',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.RBI],
      type: 'number',
      sortable: true,
    },
    {
      header: 'HR',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.HR],
      type: 'number',
      sortable: true,
    },
    {
      header: 'SB',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.SB],
      type: 'number',
      sortable: true,
    },
    {
      header: 'AVG',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.AVG].toFixed(3),
      type: 'number',
      sortable: true,
    },
    {
      header: 'K',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.K],
    },
    {
      header: 'W',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.W],
      type: 'number',
      sortable: true,
    },
    {
      header: 'SV',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.SV],
      type: 'number',
      sortable: true,
    },
    {
      header: 'HD',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.HD],
      type: 'number',
      sortable: true,
    },
    {
      header: 'ERA',
      render: ({ data }: { data: BaseballTeam }) =>
        data?.valuesByStat[BaseballStat.ERA].toFixed(3),
      type: 'number',
      sortable: true,
    },
  ];

  const gridStyle = { minHeight: 500 };

  const dataSource = isSuccess ? data.teams : [];

  return (
    <>
      <h1>Fantasy Baseball Home</h1>
      <div className="flex">
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
        <div className="flex-1">
          <ReactDataGrid
            idProperty="id"
            defaultSortInfo={defaultSortInfo}
            columns={columns}
            dataSource={dataSource}
            style={gridStyle}
          />
        </div>
      </div>
    </>
  );
}
