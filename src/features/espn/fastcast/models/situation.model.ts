import { IAthleteEntity } from './athlete-entity.model';
import { ILastPlayEntity } from './last-play.model';

export interface ISituationEntity {
  lastPlay: ILastPlayEntity | null;
  down: number;
  yardLine: number;
  distance: number;
  downDistanceText: string;
  shortDownDistanceText: string;
  possessionText: string;
  isRedZone: boolean;
  homeTimeouts: number;
  awayTimeouts: number;
  possession: string;
  balls: number;
  strikes: number;
  outs: number;
  onFirst: boolean;
  onSecond: boolean;
  onThird: boolean;
  batter: MlbSituationAthlete;
  pitcher: MlbSituationAthlete;
}

export interface MlbSituationAthlete {
  playerId: number;
  summary: string;
  athlete: IAthleteEntity;
}
