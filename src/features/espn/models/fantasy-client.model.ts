export type FetchLeagueArgs = {
  year: string;
  leagueId: string;
};

export type FetchTeamArgs = FetchLeagueArgs & {
  teamId: string;
};
