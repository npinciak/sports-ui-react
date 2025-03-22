type RecordAttributes = 'gamesBack' | 'losses' | 'percentage' | 'pointsAgainst' | 'pointsFor' | 'streakLength' | 'ties' | 'wins';
export type IClientRecord = { [prop in RecordAttributes]: number } & { streakType: string };
