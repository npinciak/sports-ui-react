import { KeyboardDoubleArrowLeft } from '@mui/icons-material';
import { FastcastEventTeam } from '../../models/fastcast-team.model';

export function FastcastChanceToWinHomeComponent({
  team,
}: {
  team: FastcastEventTeam | null | undefined;
}) {
  const homeTeamChanceToWin = team?.chanceToWinPct ?? 0;

  const homeTeamColor = team?.color ?? '';

  const homeTeamAbbrev = team?.abbrev ?? '';

  const homeTeamStyle = {
    borderRadius: homeTeamChanceToWin >= 95 ? '10px' : '0px 10px 10px 0px',
    width: `${homeTeamChanceToWin.toFixed(0)}%`,
    backgroundColor: homeTeamColor,
    color: 'white',
  };

  return (
    <>
      {homeTeamChanceToWin >= 5 && (
        <div className="font-semibold p-2" style={homeTeamStyle}>
          {homeTeamChanceToWin >= 25 && (
            <>
              <KeyboardDoubleArrowLeft className="animate-pulse" />
              {homeTeamAbbrev}
              <span className="ml-2">{homeTeamChanceToWin.toFixed(0)}%</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
