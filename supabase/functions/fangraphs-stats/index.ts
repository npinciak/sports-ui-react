const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
} as const;

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const body = await req.json();

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(body)) {
    params.append(key, value as string);
  }

  const response = await fetch(`https://www.fangraphs.com/api/leaders/major-league/data?${params.toString()}`);

  const dataTwo = await response.json();

  return new Response(JSON.stringify(dataTwo), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
