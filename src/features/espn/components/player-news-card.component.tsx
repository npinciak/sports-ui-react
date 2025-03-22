import { Card, CardContent, CardMedia } from '@mui/material';
import { FantasyPlayerNewsEntity } from '../models/fantasy-player-news-entity.model';

interface EspnPlayerNewsCardComponentProps {
  entity: FantasyPlayerNewsEntity;
}

export function EspnPlayerNewsCardComponent({
  entity,
}: EspnPlayerNewsCardComponentProps) {
  const { id, headline, byline, story, image, type } = entity;

  return (
    <Card className="mt-2" key={id}>
      <CardMedia component="img" image={image ?? ''} />
      <CardContent>
        <div
          role="article"
          aria-labelledby={headline ?? '-'}
          aria-describedby="headline author story"
        >
          <div id="headline" className="font-semibold mb-2">
            {headline}
          </div>

          <div id="author" className="text-xs mb-2">
            {byline ?? type}
          </div>
          <div
            id="story"
            className="font-normal text-lg"
            dangerouslySetInnerHTML={{ __html: story ?? '' }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
