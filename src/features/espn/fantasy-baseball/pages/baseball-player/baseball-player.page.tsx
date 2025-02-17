import { Box, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EspnPlayerNewsCardComponent } from '../../../components/player-news-card.component';
import { getPlayerNewsById } from '../../../selectors/espn-player-news.selectors';

export function BaseballPlayer() {
  const { playerId } = useParams();

  const playerNews = useSelector(getPlayerNewsById)(playerId ?? null);
  return (
    <Box marginTop={2}>
      <Card>
        <CardContent>
          <div>Baseball Player</div>
        </CardContent>
      </Card>

      {playerNews!.map(news => {
        return <EspnPlayerNewsCardComponent entity={news} />;
      })}
    </Box>
  );
}
