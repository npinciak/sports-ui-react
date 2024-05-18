const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
} as const;

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const body = await req.json();

  const {
    pos,
    team,
    players,
    meta: { pageitems, pagenum },
  } = body;

  const playerIds = players.length > 0 ? players.join(',') : '';

  const response = await fetch(
    `https://www.fangraphs.com/api/leaders/major-league/data?age=&pos=${pos}&stats=bat&lg=all&qual=y&season=2024&season1=2024&startdate=2024-03-01&enddate=2024-11-01&month=0&hand=&team=${team}&pageitems=${pageitems ?? 30}&pagenum=${pagenum ?? 1}&ind=0&rost=0&players=${playerIds}&type=8&postseason=&sortdir=default&sortstat=WAR`
  );

  const dataTwo = await response.json();

  return new Response(JSON.stringify(dataTwo), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});

// https://www.fangraphs.com/api/leaders/major-league/data?age=&pos=all&stats=bat&lg=all&qual=y&season=2024&season1=2024&startdate=2024-03-01&enddate=2024-11-01&month=0&hand=&team=0&pageitems=30&pagenum=1&ind=0&rost=0&players=&type=8&postseason=&sortdir=default&sortstat=WAR
