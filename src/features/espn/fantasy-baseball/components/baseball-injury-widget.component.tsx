import { WarningAmber } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
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
import { COLOR } from 'src/app.theme';
import { BaseballPlayerEntity } from '../models/baseball-player.model';
import { BaseballLineupCard } from './baseball-lineup-card';
import { EmptyWidgetState } from './baseball-team-widget/widget-empty.component';
import { WidgetHeader } from './baseball-team-widget/widget-header.component';

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
          sx={{
            backgroundColor: getSeverityColorByStatus(
              status as PlayerCompetitionStatus
            ),
            color: 'white',
          }}
          size="medium"
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
                    variant="outlined"
                    sx={{
                      backgroundColor: COLOR.DYNAMIC_GREEN,
                      ml: 1,
                      height: 20,
                      fontSize: '0.7rem',
                    }}
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
          <BaseballLineupCard player={player} onClick={() => {}} />

          // <InjuryPlayerItem
          //   key={player.id}
          //   player={player}
          //   isLast={index === displayedItems.length - 1}
          // />
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

// Main widget component
interface BaseballInjuryWidgetProps {
  injuryPlayerList: BaseballPlayerEntity[];
  maxItems?: number;
}

export function BaseballInjuryWidget({
  injuryPlayerList,
  maxItems = 3,
}: BaseballInjuryWidgetProps) {
  return (
    <Card elevation={2}>
      <WidgetHeader count={injuryPlayerList.length} title="Injuries" />
      <Divider />
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        {injuryPlayerList.length === 0 ? (
          <EmptyWidgetState title="No injuries to report" />
        ) : (
          <InjuryPlayerList players={injuryPlayerList} maxItems={maxItems} />
        )}
      </CardContent>
    </Card>
  );
}
