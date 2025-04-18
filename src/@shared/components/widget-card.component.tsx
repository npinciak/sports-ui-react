import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export interface WidgetCardProps {
  title: string;
  value?: string | number;
  children?: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export function WidgetCard({
  title,
  value,
  children,
  emptyMessage = 'No data available',
  isEmpty = false,
}: WidgetCardProps) {
  return (
    <StyledCard>
      <CardContent>
        <HeaderBox>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {title}
          </Typography>

          {value && (
            <Typography variant="h3" color="primary">
              {value}
            </Typography>
          )}
        </HeaderBox>

        <Divider sx={{ my: 2 }} />

        {!isEmpty ? (
          children
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            {emptyMessage}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
}
