const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
} as const;

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const body = await req.json();

  const {
    pos,
    meta: { pageitems, pagenum },
    team,
    players,
    statSplitPeriod,
  } = body;

  const playerParam = players.length === 0 ? '0' : players.map(id => Number(id)).join(',');
  const params = new URLSearchParams();
  params.append('pos', pos);
  params.append('players', playerParam);
  params.append('pageitems', pageitems.toString() ?? '30');
  params.append('pagenum', pagenum.toString() ?? '1');
  params.append('team', team as unknown as string);
  params.append('month', statSplitPeriod.toString());
  params.append('age', '');
  params.append('stats', 'bat');
  params.append('lg', 'all');
  params.append('qual', 'y');
  params.append('season', '2024');
  params.append('season1', '2024');
  params.append('startdate', '2024-03-01');
  params.append('enddate', '2024-11-01');
  params.append('hand', '');
  params.append('ind', '0');
  params.append('rost', '0');
  params.append('type', '8');
  params.append('postseason', '');
  params.append('sortdir', 'default');
  params.append('sortstat', 'WAR');

  const response = await fetch(`https://www.fangraphs.com/api/leaders/major-league/data?${params.toString()}`);

  const dataTwo = await response.json();

  return new Response(JSON.stringify(dataTwo), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
