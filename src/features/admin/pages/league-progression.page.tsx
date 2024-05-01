import { useGetLeagueProgressionQuery } from '../../../@shared/supabase/supabase.client';

export function AdminLeagueProgressionPage() {
  const { data } = useGetLeagueProgressionQuery({});

  return <div>League Progression Page</div>;
}
