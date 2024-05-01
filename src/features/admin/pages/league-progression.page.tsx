import ReactDataGrid from '@inovua/reactdatagrid-community';
import { SupaClientLeagueProgression } from '../../../@shared/supabase/supabase-tables.model';
import { useGetLeagueProgressionQuery } from '../../../@shared/supabase/supabase.client';
import { AdminLeagueProgressionForm } from '../components/league-progression-form.component';

export function AdminLeagueProgressionPage() {
  const { data } = useGetLeagueProgressionQuery({});

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
      <h1>League Progression Page</h1>

      <ReactDataGrid
        idProperty="playerId"
        columns={columns}
        dataSource={data ?? []}
        style={gridStyle}
      />

      <AdminLeagueProgressionForm />
    </>
  );
}
