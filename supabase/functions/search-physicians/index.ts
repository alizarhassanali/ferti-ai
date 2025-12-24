import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || '';
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    console.log(`Searching physicians with query: "${query}", limit: ${limit}`);

    // Require at least 2 characters
    if (query.length < 2) {
      console.log('Query too short, returning empty results');
      return new Response(
        JSON.stringify({ data: [], error: null }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Search by first name, last name, or clinic name (case-insensitive)
    const searchPattern = `%${query}%`;
    
    const { data, error } = await supabase
      .from('referring_physicians')
      .select('id, first_name, last_name, clinic_name, city, province, specialty')
      .eq('active', true)
      .or(`first_name.ilike.${searchPattern},last_name.ilike.${searchPattern},clinic_name.ilike.${searchPattern}`)
      .limit(limit);

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ data: null, error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${data?.length || 0} physicians`);

    return new Response(
      JSON.stringify({ data, error: null }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ data: null, error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});