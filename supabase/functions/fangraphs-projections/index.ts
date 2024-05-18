// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
} as const;

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const body = await req.json();

  const { type, pos, team } = body;

  const response = await fetch(
    `https://www.fangraphs.com/api/projections?type=${type}&stats=bat&pos=${pos}&team=${team}&players=0&lg=all&z=1714300977`
  );

  const dataTwo = await response.json();

  return new Response(JSON.stringify(dataTwo), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
