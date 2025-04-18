import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { FastcastEventTeam } from '../../models/fastcast-team.model';

export function FastcastChanceToWinComponent({
  teams,
}: {
  teams: Record<'home' | 'away', FastcastEventTeam | null> | null;
}) {
  const awayTeamChanceToWin = teams?.away?.chanceToWinPct ?? 0;
  const homeTeamChanceToWin = teams?.home?.chanceToWinPct ?? 0;

  const homeTeamColor = teams?.home?.color ?? '';
  const awayTeamColor = teams?.away?.color ?? '';

  const awayTeamAbbrev = teams?.away?.abbrev ?? '';
  const homeTeamAbbrev = teams?.home?.abbrev ?? '';

  const awayTeamStyle = {
    borderRadius: awayTeamChanceToWin >= 95 ? '10px' : '10px 0px 0px 10px',
    width: `${awayTeamChanceToWin.toFixed(0)}%`,
    backgroundColor: awayTeamColor,
    color: 'white',
  };

  const homeTeamStyle = {
    borderRadius: homeTeamChanceToWin >= 95 ? '10px' : '0px 10px 10px 0px',
    width: `${homeTeamChanceToWin.toFixed(0)}%`,
    backgroundColor: homeTeamColor,
    color: 'white',
  };

  return (
    <Grid container className="w-full mb-2 text-xs" columnSpacing={1}>
      <Grid size={12}>
        <div className="flex w-full">
          {awayTeamChanceToWin >= 5 && (
            <div className="font-semibold p-2" style={awayTeamStyle}>
              {awayTeamChanceToWin >= 25 && (
                <>
                  <span className="mr-2">
                    {awayTeamChanceToWin.toFixed(0)}%
                  </span>
                  {awayTeamAbbrev}
                  <KeyboardDoubleArrowRight className="animate-pulse" />
                </>
              )}
            </div>
          )}

          {homeTeamChanceToWin >= 5 && (
            <div className="font-semibold p-2" style={homeTeamStyle}>
              {homeTeamChanceToWin >= 25 && (
                <>
                  <KeyboardDoubleArrowLeft className="animate-pulse" />
                  {homeTeamAbbrev}
                  <span className="ml-2">
                    {homeTeamChanceToWin.toFixed(0)}%
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
