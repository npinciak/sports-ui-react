import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';

interface EmptyWidgetStateProps {
  title: string;
}

export function EmptyWidgetState({ title }: EmptyWidgetStateProps) {
  return (
    <Box p={3} textAlign="center">
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Box>
  );
}
