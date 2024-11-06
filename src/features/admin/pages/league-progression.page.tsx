import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
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
          <Card>
            <CardContent>
              <AdminLeagueProgressionForm />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="League Progression" />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>date</TableCell>
                    <TableCell>rank</TableCell>
                    <TableCell>totalPoints</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leagueProgression?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.rank}</TableCell>
                      <TableCell>{row.total_points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
