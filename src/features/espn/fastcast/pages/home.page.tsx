import Box from '@mui/material/Box/Box';
import { FastcastWrapperComponent } from '../components/fastcast-wrapper.component';

export function FastcastScoreboardHomePage() {
  return (
    <Box
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FastcastWrapperComponent />
    </Box>
  );
}
