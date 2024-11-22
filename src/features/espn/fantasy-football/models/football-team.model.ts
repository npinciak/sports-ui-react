import { EspnClient } from 'sports-ui-sdk';
import { TeamEntity } from '../../../../@shared/models/base-team.model';
import { FootballPlayer } from './football-player.model';

type FootballTeamAttributes = Pick<EspnClient.RecordEntity, 'wins' | 'losses' | 'ties' | 'pointsAgainst' | 'pointsFor' | 'percentage'>;

export type FootballTeam = TeamEntity &
  FootballTeamAttributes & {
    currentRank: number;
  };

export type FootballTeamWithRoster = FootballTeam & {
  roster: FootballPlayer[];
};
