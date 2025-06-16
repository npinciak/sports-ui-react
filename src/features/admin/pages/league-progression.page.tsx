import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LineChart } from '@mui/x-charts/LineChart/LineChart';
import { SupabaseClient } from '@shared/supabase/supabase.client';

export function AdminLeagueProgressionPage() {
  const { data: leagueProgression } =
    SupabaseClient.useGetLeagueProgressionQuery({});

  const chartData = leagueProgression
    ?.map(row => ({
      rank: row.rank,
      date: row.date,
      totalPoints: row.total_points,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Box
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={2}>
        <Grid size={12}></Grid>
        <Grid size={12}>
          <LineChart
            yAxis={[{ data: chartData?.map(row => row.totalPoints) ?? [] }]}
            series={[
              {
                data: chartData?.map(row => row.totalPoints) ?? [],
                area: true,
                color: '#38bdf8',
              },
              {
                data: chartData?.map(row => row.rank) ?? [],
                area: true,
                color: '#c084fc',
              },
            ]}
            height={400}
          />
        </Grid>
        <Grid size={12}>
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
