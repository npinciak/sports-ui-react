export enum PlayerRatingTimePeriod {
  Season,
  Pr7,
  Pr15,
  Pr30,
}

type PlayerRatingsAttributes = 'positionalRanking' | 'totalRanking' | 'totalRating';
export type IClientPlayerRatings = { [prop in PlayerRatingsAttributes]: number };
export type IClientPlayerRatingsMapByTimePeriod = Record<PlayerRatingTimePeriod, IClientPlayerRatings>;
