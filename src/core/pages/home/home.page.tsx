import { Box, Container, Typography } from '@mui/material';

export function HomePage() {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Home
        </Typography>
      </Box>
    </Container>
  );
}
