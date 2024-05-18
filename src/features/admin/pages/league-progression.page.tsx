import ReactDataGrid from '@inovua/reactdatagrid-community';
import { SupaClientLeagueProgression } from '../../../@shared/supabase/supabase-tables.model';
import { useGetLeagueProgressionQuery } from '../../../@shared/supabase/supabase.client';
import { AdminLeagueProgressionForm } from '../components/league-progression-form.component';

export function AdminLeagueProgressionPage() {
  const { data: leagueProgression } = useGetLeagueProgressionQuery({});

  const columns = [
    {
      header: 'date',
      render: ({ data }: { data: SupaClientLeagueProgression }) => data.date,
      type: 'string',
    },
    {
      header: 'rank',
      render: ({ data }: { data: SupaClientLeagueProgression }) => data.rank,
      type: 'number',
    },
    {
      header: 'totalPoints',
      render: ({ data }: { data: SupaClientLeagueProgression }) =>
        data.total_points,
      type: 'number',
    },
  ];

  const gridStyle = { minHeight: 500 };

  return (
    <>
      <div className="grid grid-cols-3 text-left mb-5 mt-5">
        <div>
          <ReactDataGrid
            idProperty="playerId"
            columns={columns}
            dataSource={leagueProgression ?? []}
            style={gridStyle}
          />
        </div>
        <div>
          <AdminLeagueProgressionForm />
        </div>
      </div>
    </>
  );
}
