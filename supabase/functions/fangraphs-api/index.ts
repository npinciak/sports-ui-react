const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
} as const;

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const body = await req.json();

  const { path } = body;

  const response = await fetch(`https://www.fangraphs.com/api${path}`);

  const dataTwo = await response.json();

  return new Response(JSON.stringify(dataTwo), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
