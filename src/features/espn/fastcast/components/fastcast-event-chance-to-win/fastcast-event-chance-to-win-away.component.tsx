import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { FastcastEventTeam } from '../../models/fastcast-team.model';

export function FastcastChanceToWinAwayComponent({
  team,
}: {
  team: FastcastEventTeam | null | undefined;
}) {
  const teamChanceToWin = team?.chanceToWinPct ?? 0;

  const teamColor = team?.color ?? '';

  const teamAbbrev = team?.abbrev ?? '';

  const awayTeamStyle = {
    borderRadius: teamChanceToWin >= 95 ? '10px' : '10px 0px 0px 10px',
    width: `${teamChanceToWin.toFixed(0)}%`,
    backgroundColor: teamColor,
    color: 'white',
  };

  return (
    <>
      {teamChanceToWin >= 5 && (
        <div className="font-semibold p-2" style={awayTeamStyle}>
          {teamChanceToWin >= 25 && (
            <>
              <span className="mr-2">{teamChanceToWin.toFixed(0)}%</span>
              {teamAbbrev}
              <KeyboardDoubleArrowRight className="animate-pulse" />
            </>
          )}
        </div>
      )}
    </>
  );
}
