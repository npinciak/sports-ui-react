import { Avatar, Skeleton } from '@mui/material';
import { BaseballTeam } from '../../models/baseball-team.model';

interface BaseballTeamHeaderProps {
  team: BaseballTeam | undefined;
  isLoading: boolean;
}

export function BaseballTeamHeader({
  team,
  isLoading,
}: BaseballTeamHeaderProps) {
  return (
    <div className="grid sm:grid-cols-1 grid-cols-3 text-left mb-5 mt-5">
      <div>
        {isLoading ? (
          <Skeleton variant="circular">
            <Avatar src={team?.logo} alt={team?.name} />
          </Skeleton>
        ) : (
          <Avatar src={team?.logo} alt={team?.name} />
        )}
      </div>
      <div className="col-span-2">
        {isLoading ? (
          <>
            <Skeleton>
              <h1>
                {team?.name} {team?.totalPoints}
              </h1>
            </Skeleton>

            <Skeleton>
              <div>
                <span className="text-xs">Rank: {team?.currentRank}</span>
              </div>
            </Skeleton>
          </>
        ) : (
          <>
            <h1>
              {team?.name} {team?.totalPoints}
            </h1>
            <div>
              <span className="text-xs">Rank: {team?.currentRank}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
