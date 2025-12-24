import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the invite by token
    const { data: invite, error: inviteError } = await supabase
      .from("invites")
      .select(`
        id,
        email,
        role_to_assign,
        expires_at,
        used_at,
        team_member_id,
        requires_profile_completion,
        team_members (
          first_name,
          last_name
        )
      `)
      .eq("token", token)
      .single();

    if (inviteError || !invite) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: "Invalid invite link",
          message: "This invite link is not valid. Please request a new invite from your administrator."
        }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if already used
    if (invite.used_at) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: "Invite already used",
          message: "This invite link has already been used. Please log in or request a new invite."
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if expired
    const expiresAt = new Date(invite.expires_at);
    if (expiresAt < new Date()) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: "Invite expired",
          message: "This invite link has expired. Please request a new invite from your administrator."
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get team member data (it's a single record via foreign key)
    const teamMember = Array.isArray(invite.team_members) 
      ? invite.team_members[0] 
      : invite.team_members;

    // Return valid invite data
    return new Response(
      JSON.stringify({
        valid: true,
        invite_id: invite.id,
        email: invite.email,
        role_to_assign: invite.role_to_assign,
        requires_profile_completion: invite.requires_profile_completion ?? true,
        first_name: teamMember?.first_name || "",
        last_name: teamMember?.last_name || "",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error validating invite:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
