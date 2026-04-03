const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, subject, message, rating, severity, userEmail } = await req.json();

    // Log the feedback notification (in production, this would send an email)
    console.log('Feedback received:', {
      type,
      subject,
      message,
      rating,
      severity,
      userEmail,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Notification processed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing feedback notification:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process notification' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
