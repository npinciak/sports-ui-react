import { Card, CardContent, CardMedia } from '@mui/material';
import { FantasyPlayerNewsEntity } from '../models/fantasy-player-news-entity.model';

interface EspnPlayerNewsCardComponentProps {
  entity: FantasyPlayerNewsEntity;
}

export function EspnPlayerNewsCardComponent({
  entity,
}: EspnPlayerNewsCardComponentProps) {
  const { id, headline, byline, story, image, link } = entity;

  return (
    <Card className="mt-2" key={id}>
      <CardMedia component="img" image={image ?? ''} />
      <CardContent>
        <div className="font-semibold mb-2">{headline}</div>

        <div className="text-xs mb-2">{byline}</div>
        <div
          className="font-normal text-lg"
          dangerouslySetInnerHTML={{ __html: story ?? '' }}
        />
      </CardContent>
    </Card>
  );
}
