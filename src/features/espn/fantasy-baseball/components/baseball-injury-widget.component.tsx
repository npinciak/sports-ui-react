import { LocalHospital, MoreHoriz, WarningAmber } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BATTING_LINEUP_SLOTS } from '@sdk/espn-client-models/baseball/lineup/lineup.const';
import {
  INJURY_SEVERITY_BY_INJURY_STATUS,
  INJURY_SEVERITY_COLOR,
  INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY,
  InjurySeverity,
} from '@sdk/injury/injury-severity.model';
import {
  PLAYER_COMPETITION_STATUS_LABEL_BY_PLAYER_COMPETITION_STATUS,
  PlayerCompetitionStatus,
} from '@sdk/injury/injury-status.model';
import { useState } from 'react';
import { BaseballPlayerEntity } from '../models/baseball-player.model';

// Helper function to get severity color based on injury status
const getSeverityColorByStatus = (status: PlayerCompetitionStatus) => {
  const severity = INJURY_SEVERITY_BY_INJURY_STATUS[status];
  switch (severity) {
    case InjurySeverity.Serious:
      return INJURY_SEVERITY_COLOR.Serious;
    case InjurySeverity.SemiSerious:
      return INJURY_SEVERITY_COLOR.SemiSerious;
    case InjurySeverity.Positive:
      return INJURY_SEVERITY_COLOR.Positive;
    default:
      return '#808080'; // Default gray color
  }
};

// Helper to convert severity color to MUI color
const getMuiColorFromSeverity = (status: PlayerCompetitionStatus) => {
  const severity = INJURY_SEVERITY_BY_INJURY_STATUS[status];
  switch (severity) {
    case InjurySeverity.Serious:
      return 'error';
    case InjurySeverity.SemiSerious:
      return 'warning';
    case InjurySeverity.Positive:
      return 'success';
    default:
      return 'default';
  }
};

// Header component for the injury widget
interface InjuryWidgetHeaderProps {
  count: number;
}

function InjuryWidgetHeader({ count }: InjuryWidgetHeaderProps) {
  return (
    <CardHeader
      title={
        <Box display="flex" alignItems="center" gap={1}>
          <LocalHospital color="error" />
          <Typography variant="h6" component="span">
            Injuries
          </Typography>
          <Chip
            label={count}
            color={count > 0 ? 'error' : 'default'}
            size="small"
          />
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

// Status chips summary component
interface InjuryStatusChipsProps {
  severityCounts: Record<PlayerCompetitionStatus, number>;
}

function InjuryStatusChips({ severityCounts }: InjuryStatusChipsProps) {
  return (
    <Box px={2} py={1} display="flex" gap={1} flexWrap="wrap">
      {Object.entries(severityCounts).map(([status, count]) => (
        <Chip
          key={status}
          label={`${
            PLAYER_COMPETITION_STATUS_LABEL_BY_PLAYER_COMPETITION_STATUS[
              status as PlayerCompetitionStatus
            ]
          }: ${count}`}
          color={
            getMuiColorFromSeverity(status as PlayerCompetitionStatus) as any
          }
          size="small"
          variant="outlined"
        />
      ))}
    </Box>
  );
}

// Individual player item component
interface InjuryPlayerItemProps {
  player: BaseballPlayerEntity;
  isLast: boolean;
}

function InjuryPlayerItem({ player, isLast }: InjuryPlayerItemProps) {
  return (
    <>
      <ListItem disablePadding sx={{ px: 2, py: 1 }}>
        <Grid container spacing={1} width="100%">
          <Grid size={{ xs: 6, sm: 6 }}>
            <Typography variant="body1" fontWeight="medium">
              {player.name}
              {BATTING_LINEUP_SLOTS.includes(player?.lineupSlotId) && (
                <Tooltip title="In Starting Lineup">
                  <Chip
                    icon={<WarningAmber fontSize="small" />}
                    label="Starting"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                  />
                </Tooltip>
              )}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {player.team}, {player.position}
            </Typography>
          </Grid>
          <Grid size={{ xs: 4, sm: 4 }}>
            <Chip
              label={
                PLAYER_COMPETITION_STATUS_LABEL_BY_PLAYER_COMPETITION_STATUS[
                  player?.health?.injuryStatus as PlayerCompetitionStatus
                ]
              }
              size="small"
              color={
                getMuiColorFromSeverity(
                  player?.health?.injuryStatus as PlayerCompetitionStatus
                ) as any
              }
              sx={{
                '& .MuiChip-label': {
                  color: 'white',
                },
                backgroundColor:
                  INJURY_SEVERITY_COLOR_BY_INJURY_SEVERITY[
                    player?.health?.injurySeverity ?? InjurySeverity.Unknown
                  ],
              }}
            />
          </Grid>
        </Grid>
      </ListItem>
      {!isLast && <Divider />}
    </>
  );
}

// Player list component
interface InjuryPlayerListProps {
  players: BaseballPlayerEntity[];
  maxItems: number;
}

function InjuryPlayerList({ players, maxItems }: InjuryPlayerListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? players : players.slice(0, maxItems);
  const hasMoreItems = players.length > maxItems;

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <>
      <List disablePadding>
        {displayedItems.map((player, index) => (
          <InjuryPlayerItem
            key={player.id}
            player={player}
            isLast={index === displayedItems.length - 1}
          />
        ))}
      </List>
      {hasMoreItems && (
        <Box p={1} textAlign="center">
          <Button
            size="small"
            onClick={toggleShowAll}
            sx={{ textTransform: 'none' }}
          >
            {showAll ? 'Show Less' : `View ${players.length - maxItems} More`}
          </Button>
        </Box>
      )}
    </>
  );
}

// Empty state component
function EmptyInjuryState() {
  return (
    <Box p={3} textAlign="center">
      <Typography variant="body2" color="text.secondary">
        No injuries to report
      </Typography>
    </Box>
  );
}

// Main widget component
interface BaseballInjuryWidgetProps {
  injuryPlayerList: BaseballPlayerEntity[];
  maxItems?: number;
}

export function BaseballInjuryWidget({
  injuryPlayerList,
  maxItems = 3,
}: BaseballInjuryWidgetProps) {
  // Get severity counts for the badge colors
  const severityCounts = injuryPlayerList.reduce(
    (acc, player) => {
      const status = player?.health?.injuryStatus as PlayerCompetitionStatus;
      if (status) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    },
    {} as Record<PlayerCompetitionStatus, number>
  );

  return (
    <Card elevation={2}>
      <InjuryWidgetHeader count={injuryPlayerList.length} />
      <Divider />
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        {injuryPlayerList.length === 0 ? (
          <EmptyInjuryState />
        ) : (
          <>
            <InjuryStatusChips severityCounts={severityCounts} />
            <Divider />
            <InjuryPlayerList players={injuryPlayerList} maxItems={maxItems} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
