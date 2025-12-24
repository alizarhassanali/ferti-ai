import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AcceptInviteRequest {
  token: string;
  password: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { token, password }: AcceptInviteRequest = await req.json();

    if (!token || !password) {
      return new Response(
        JSON.stringify({ error: "Token and password are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validate the invite
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
        JSON.stringify({ error: "Invalid invite link" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (invite.used_at) {
      return new Response(
        JSON.stringify({ error: "This invite has already been used" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const expiresAt = new Date(invite.expires_at);
    if (expiresAt < new Date()) {
      return new Response(
        JSON.stringify({ error: "This invite has expired" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get team member data (it's a single record via foreign key)
    const teamMember = Array.isArray(invite.team_members) 
      ? invite.team_members[0] 
      : invite.team_members;

    // Create the user account
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: invite.email,
      password: password,
      email_confirm: true,
      user_metadata: {
        first_name: teamMember?.first_name || "",
        last_name: teamMember?.last_name || "",
        role: invite.role_to_assign,
      },
    });

    if (authError) {
      console.error("Error creating user:", authError);
      return new Response(
        JSON.stringify({ error: authError.message || "Failed to create account" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = authData.user.id;

    // Create user profile
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        user_id: userId,
        email: invite.email,
        first_name: teamMember?.first_name || "",
        last_name: teamMember?.last_name || "",
        role: invite.role_to_assign,
        signature_email: invite.email,
        profile_completed: false,
      });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      // Don't fail the whole request, profile can be created later
    }

    // Mark invite as used
    const { error: updateError } = await supabase
      .from("invites")
      .update({ used_at: new Date().toISOString() })
      .eq("id", invite.id);

    if (updateError) {
      console.error("Error updating invite:", updateError);
    }

    // Update team member status to active
    if (invite.team_member_id) {
      await supabase
        .from("team_members")
        .update({ status: "active" })
        .eq("id", invite.team_member_id);
    }

    // Sign in the user to get session tokens
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: invite.email,
      password: password,
    });

    if (signInError) {
      console.error("Error signing in:", signInError);
      // User was created but couldn't sign in automatically
      return new Response(
        JSON.stringify({
          success: true,
          message: "Account created. Please log in.",
          requires_login: true,
          role: invite.role_to_assign,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: signInData.user,
        session: signInData.session,
        role: invite.role_to_assign,
        requires_profile_completion: invite.requires_profile_completion ?? true,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error accepting invite:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
