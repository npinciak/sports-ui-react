import { Box, Button, Typography } from '@mui/material';

export function HomePage() {
  return (
    <>
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Sports UI
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Your one-stop platform for managing fantasy sports teams, viewing
          player stats, and staying updated with the latest sports news.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" href="/fantasy-baseball">
            Fantasy Baseball
          </Button>
          <Button variant="outlined" color="secondary" href="/fantasy-football">
            Fantasy Football
          </Button>
        </Box>
      </Box>
    </>
  );
}
