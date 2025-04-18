import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { WidgetCard } from '../../../../@shared/components/widget-card.component';

interface BaseballTradeablesWidgetProps {
  teamsWithTradeablePlayersCount: number;
  teamsWithTradeablePlayers: Array<{
    id: string | number;
    name: string;
  }>;
}

export function BaseballTradeablesWidget({
  teamsWithTradeablePlayersCount,
  teamsWithTradeablePlayers,
}: BaseballTradeablesWidgetProps) {
  return (
    <WidgetCard
      title="Teams with Tradeables"
      value={teamsWithTradeablePlayersCount}
      isEmpty={teamsWithTradeablePlayers.length === 0}
      emptyMessage="No teams with tradeable players"
    >
      <List dense disablePadding>
        {teamsWithTradeablePlayers.map(team => (
          <ListItem key={team.id} sx={{ py: 0.5 }}>
            <ListItemText primary={team.name} />
          </ListItem>
        ))}
      </List>
    </WidgetCard>
  );
}
