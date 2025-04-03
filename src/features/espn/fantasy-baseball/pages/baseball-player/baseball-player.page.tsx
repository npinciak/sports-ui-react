import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EspnPlayerNewsCardComponent } from '../../../components/player-news-card.component';
import { getPlayerNewsById } from '../../../selectors/espn-player-news.selectors';
import { BaseballPlayerHeader } from '../../components/baseball-player-header/baseball-player-header.component';
import { selectPlayerById } from '../../selectors/baseball-team-roster.selector';

export function BaseballPlayer() {
  const { playerId } = useParams();

  const playerNews = useSelector(getPlayerNewsById)(playerId ?? null);

  const player = useSelector(selectPlayerById)(playerId ?? null);

  if (!player) return <div>Player not found</div>;

  return (
    <Box marginTop={2}>
      <BaseballPlayerHeader player={player} />

      {playerNews!.map(news => {
        return <EspnPlayerNewsCardComponent entity={news} />;
      })}
    </Box>
  );
}
