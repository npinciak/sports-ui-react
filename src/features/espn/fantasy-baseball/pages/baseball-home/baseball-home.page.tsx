import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import {
  TypeColumn,
  TypeSortInfo,
} from '@inovua/reactdatagrid-community/types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BaseballStat } from 'sports-ui-sdk';
import { useGetLeagueProgressionQuery } from '../../../../../@shared/supabase/supabase.client';
import { BaseballTeam } from '../../models/baseball-team.model';
import { BaseballTeamEntitySelector, standings } from '../../selectors';

export function BaseballHome() {
  const { data: teams } = useGetLeagueProgressionQuery({});

  const liveStandings = useSelector(standings);

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
        data?.valuesByStat[BaseballStat.AVG],
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
        data?.valuesByStat[BaseballStat.ERA],
      type: 'number',
      sortable: true,
    },
  ];

  const gridStyle = { minHeight: 500 };

  const dataSource = useSelector(BaseballTeamEntitySelector.selectAll);

  return (
    <>
      <h1>Fantasy Baseball Home</h1>
      <div className="flex">
        <div className="flex-1">
          {liveStandings.map(team => {
            return (
              <ul key={team.id}>
                <li>
                  {team.team.name} - {team.liveScore}
                </li>
              </ul>
            );
          })}
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
