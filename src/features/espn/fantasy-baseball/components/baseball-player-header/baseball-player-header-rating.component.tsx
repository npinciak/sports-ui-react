import {
  IClientPlayerRatings,
  IClientPlayerRatingsMapByTimePeriod,
  PlayerRatingTimePeriod,
} from '@sdk/espn-client-models';

interface BaseballPlayerHeaderRatingProps {
  playerRatings: IClientPlayerRatingsMapByTimePeriod | null;
}

export function BaseballPlayerHeaderRatingComponent({
  playerRatings,
}: BaseballPlayerHeaderRatingProps) {
  const hasRatings = playerRatings != null;

  const hasSeasonRating =
    hasRatings && playerRatings[PlayerRatingTimePeriod.Season] != null;

  const hasPr7Rating =
    hasRatings && playerRatings[PlayerRatingTimePeriod.Pr7] != null;

  const hasPr15Rating =
    hasRatings && playerRatings[PlayerRatingTimePeriod.Pr15] != null;

  const hasPr30Rating =
    hasRatings && playerRatings[PlayerRatingTimePeriod.Pr30] != null;

  const seasonRating = hasSeasonRating
    ? (playerRatings[PlayerRatingTimePeriod.Season] as IClientPlayerRatings)
    : null;

  const pr7Rating = hasPr7Rating
    ? (playerRatings[PlayerRatingTimePeriod.Pr7] as IClientPlayerRatings)
    : null;

  const pr15Rating = hasPr15Rating
    ? (playerRatings[PlayerRatingTimePeriod.Pr15] as IClientPlayerRatings)
    : null;

  const pr30Rating = hasPr30Rating
    ? (playerRatings[PlayerRatingTimePeriod.Pr30] as IClientPlayerRatings)
    : null;

  return (
    <table className="w-full border-collapse items-center bg-transparent">
      <tbody>
        <tr>
          <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-sky-100 bg-sky-50 p-3 py-3 text-left align-middle text-xs font-semibold uppercase text-sky-500">
            Rating
          </th>
          <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 text-left align-middle text-xs"></th>
          <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-sky-100 bg-sky-50 p-3 py-3 text-left align-middle text-xs font-semibold uppercase text-sky-500">
            Pos. Rank
          </th>
        </tr>
        <tr>
          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 align-middle text-xs">
            {seasonRating ? seasonRating.totalRating.toFixed(2) : '-'}
          </td>

          <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 text-left align-middle text-xs">
            Season
          </th>

          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 align-middle text-xs">
            {seasonRating ? seasonRating.positionalRanking : '-'}
          </td>
        </tr>
        <tr>
          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 align-middle text-xs">
            {pr7Rating ? pr7Rating.totalRating.toFixed(2) : '-'}
          </td>
          <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 text-left align-middle text-xs">
            Last 7
          </th>

          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 align-middle text-xs">
            {pr7Rating ? pr7Rating.positionalRanking : '-'}
          </td>
        </tr>
        <tr>
          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 align-middle text-xs">
            {pr15Rating ? pr15Rating.totalRating.toFixed(2) : '-'}
          </td>
          <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 text-left align-middle text-xs">
            Last 15
          </th>

          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 align-middle text-xs">
            {pr15Rating ? pr15Rating.positionalRanking : '-'}
          </td>
        </tr>
        <tr>
          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 align-middle text-xs">
            {pr30Rating ? pr30Rating.totalRating.toFixed(2) : '-'}
          </td>
          <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 text-left align-middle text-xs">
            Last 30
          </th>

          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-3 align-middle text-xs">
            {pr30Rating ? pr30Rating.positionalRanking : '-'}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
