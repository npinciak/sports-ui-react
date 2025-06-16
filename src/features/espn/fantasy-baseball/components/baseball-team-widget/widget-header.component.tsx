import { MoreHoriz } from '@mui/icons-material';
import { Box, CardHeader, Chip, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';

// Header component for the injury widget
interface WidgetHeaderProps {
  count: number;
  title: string;
  icon?: React.ReactNode;
}

export function WidgetHeader({ count, title, icon }: WidgetHeaderProps) {
  return (
    <CardHeader
      title={
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography variant="h6" component="span">
            {title}
          </Typography>

          {count > 0 && (
            <Chip
              label={count}
              color={count > 0 ? 'error' : 'default'}
              size="small"
            />
          )}
        </Box>
      }
      action={
        <IconButton aria-label="settings">
          <MoreHoriz />
        </IconButton>
      }
    />
  );
}
