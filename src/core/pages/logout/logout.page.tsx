import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutQuery } from '../../../@shared/clients';

export function LogoutPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isSuccess } = useLogoutQuery();

  useEffect(() => {
    if (isSuccess) {
      setLoading(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          px: 4,
          py: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className="mb-2">{loading ? <CircularProgress /> : ''}</div>
        <Typography component="h1" variant="h5">
          Logging Out...
        </Typography>
      </Box>
    </Container>
  );
}
