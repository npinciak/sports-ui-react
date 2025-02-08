import Box from '@mui/material/Box/Box';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';

export function DailyFantasyHomePage() {
  return (
    <Box
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card>
        <CardHeader title="Dfs Home" />
        <CardContent></CardContent>
      </Card>
    </Box>
  );
}
