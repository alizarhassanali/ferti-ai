import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  phone_country_code?: string;
  phone_number?: string;
  language?: string;
  signature_title?: string;
  signature_specialty?: string;
  signature_preferred_name?: string;
  signature_email?: string;
  include_clinic_name?: boolean;
  profile_completed?: boolean;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "PATCH" && req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the JWT and get user
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = userData.user.id;
    const updateData: UpdateProfileRequest = await req.json();

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("user_id", userId)
      .single();

    let result;
    if (existingProfile) {
      // Update existing profile
      result = await supabase
        .from("user_profiles")
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();
    } else {
      // Create new profile
      result = await supabase
        .from("user_profiles")
        .insert({
          user_id: userId,
          email: userData.user.email!,
          role: userData.user.user_metadata?.role || "staff",
          ...updateData,
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error("Error updating profile:", result.error);
      return new Response(
        JSON.stringify({ error: "Failed to update profile" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, profile: result.data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
