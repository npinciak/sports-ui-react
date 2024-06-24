import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLazyResetPasswordQuery } from '../../authentication';

export function ForgotPasswordPage() {
  const [resetPassword, { error, isSuccess }] = useLazyResetPasswordQuery();

  const [email, setEmail] = useState<string | null>(null);

  const submitForm = async () => {
    await resetPassword({ email });
  };

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
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={submitForm}
          >
            Reset
          </Button>
          <Grid container>
            <Grid item>
              {isSuccess ? (
                <div>Check your email for a reset link</div>
              ) : (
                <>{error}</>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
