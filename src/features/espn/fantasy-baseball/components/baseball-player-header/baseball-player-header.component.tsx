import { Avatar, Card, CardContent } from '@mui/material';
import { BaseballPlayerEntity } from '../../models/baseball-player.model';
import { BaseballPlayerHeaderRatingComponent } from './baseball-player-header-rating.component';

interface BaseballPlayerHeaderProps {
  player: BaseballPlayerEntity;
}

export function BaseballPlayerHeader({ player }: BaseballPlayerHeaderProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col text-center items-center">
          <Avatar
            src={player.img ?? ''}
            alt={player.name ?? ''}
            sx={{ width: 160, height: 160 }}
          />
          <div className="mt-3">
            <p>{player?.name}</p>
            <div>
              <div className="mb-5">
                <h4>
                  {player?.team}, {player?.position}
                </h4>
              </div>

              <BaseballPlayerHeaderRatingComponent
                playerRatings={player?.playerRatings}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
