const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
} as const;

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const body = await req.json();

  const { type, pos, team, players } = body;

  const params = new URLSearchParams();
  params.append('type', type);
  params.append('pos', pos);
  params.append('team', team as unknown as string);
  params.append('players', players.map(id => Number(id)).join(','));
  params.append('lg', 'all');
  params.append('z', new Date().getTime().toString());

  const response = await fetch(`https://www.fangraphs.com/api/projections?${params.toString()}`);

  const dataTwo = await response.json();

  return new Response(JSON.stringify(dataTwo), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
