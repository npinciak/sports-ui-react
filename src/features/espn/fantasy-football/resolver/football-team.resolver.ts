import { LoaderFunctionArgs } from 'react-router-dom';
import { AppStore } from 'src/app.store';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';

export async function FootballTeamResolver({ params }: LoaderFunctionArgs) {
  const year = params?.year ?? null;
  const leagueId = params?.leagueId ?? null;
  const teamId = params?.teamId ?? null;

  const hasValidParams = year && leagueId && teamId;

  if (hasValidParams) {
    try {
      AppStore.dispatch(
        EspnFantasyClientV3.endpoints.getFootballTeamById.initiate({
          year,
          leagueId,
          teamId,
        })
      );

      return null;
    } catch (e) {
      console.error('Error fetching team data:', e);
      return null;
    }
  }

  return null;
}
