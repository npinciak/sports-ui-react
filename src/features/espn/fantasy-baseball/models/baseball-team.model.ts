import { EspnClient } from 'sports-ui-sdk';
import { TeamEntity } from '../../../../@shared/models';
import { BaseballPlayer } from './baseball-player.model';

interface BaseballTeamProps {
  abbrev: string;
  roster: BaseballPlayer[];
  totalPoints: number;
  currentRank: number;
  liveScore: number | null;
}

export type BaseballTeam = TeamEntity & BaseballTeamProps & Pick<EspnClient.Team, 'valuesByStat' | 'pointsByStat'>;
export type BaseballTeamMap = Record<string, BaseballTeam>;

export type BaseballTeamLive = Pick<BaseballTeam, 'id' | 'totalPoints' | 'liveScore' | 'roster'>;
export type BaseballTeamLiveMap = Record<string, BaseballTeamLive>;

export type BaseballTeamTableRow = BaseballTeam | BaseballTeamLive;
