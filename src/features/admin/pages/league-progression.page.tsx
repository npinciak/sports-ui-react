import ReactDataGrid from '@inovua/reactdatagrid-community';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
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
      <Grid container spacing={2}>
        <Grid xs={12}>
          <AdminLeagueProgressionForm />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12}>
          <ReactDataGrid
            idProperty="playerId"
            columns={columns}
            dataSource={leagueProgression ?? []}
            style={gridStyle}
          />
        </Grid>
      </Grid>
    </>
  );
}
