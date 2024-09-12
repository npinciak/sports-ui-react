import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLazyLoginWithPasswordQuery } from '../../authentication';

export function LoginPage() {
  const [login, { isFetching, isLoading }] = useLazyLoginWithPasswordQuery();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const submitForm = async () => {
    try {
      const { data } = await login({ email, password });

      if (data?.session?.access_token) navigate('/profile');
    } catch (error) {
      console.error(error);
    }
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
          Sign in
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={submitForm}
          >
            {isLoading && isFetching ? 'Signing in ...' : 'Sign in'}
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/forgot-password">Forgot password?</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
