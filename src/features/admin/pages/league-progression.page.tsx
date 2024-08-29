import ReactDataGrid from '@inovua/reactdatagrid-community';
import { Box, Grid, Typography } from '@mui/material';
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
    <Box
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">League Progression</Typography>
        </Grid>

        <Grid item xs={12}>
          <AdminLeagueProgressionForm />
        </Grid>
        <Grid item xs={12}>
          <ReactDataGrid
            idProperty="playerId"
            columns={columns}
            dataSource={leagueProgression ?? []}
            style={gridStyle}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
