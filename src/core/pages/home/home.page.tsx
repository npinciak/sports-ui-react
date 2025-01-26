import { Box } from '@mui/material';
import { FastcastWrapperComponent } from '../../../features/espn/fastcast/components/fastcast-wrapper.component';

export function HomePage() {
  return (
    <>
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FastcastWrapperComponent />
      </Box>
    </>
  );
}
