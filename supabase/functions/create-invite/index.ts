import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InviteRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "physician" | "nurse" | "staff";
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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { firstName, lastName, email, role }: InviteRequest = await req.json();

    console.log("Creating invite for:", { firstName, lastName, email, role });

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if email already exists
    const { data: existingMember } = await supabase
      .from("team_members")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existingMember) {
      return new Response(
        JSON.stringify({ error: "A user with this email already exists" }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create team member with pending status
    const { data: teamMember, error: memberError } = await supabase
      .from("team_members")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        role: role,
        status: "pending",
        invited_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (memberError) {
      console.error("Error creating team member:", memberError);
      return new Response(
        JSON.stringify({ error: memberError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate invite token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    // Create invite record
    const { data: invite, error: inviteError } = await supabase
      .from("invites")
      .insert({
        email: email.toLowerCase(),
        token: token,
        role_to_assign: role,
        expires_at: expiresAt.toISOString(),
        team_member_id: teamMember.id,
      })
      .select()
      .single();

    if (inviteError) {
      console.error("Error creating invite:", inviteError);
      return new Response(
        JSON.stringify({ error: inviteError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate invite link (using the app's URL)
    const inviteLink = `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '')}/invite?token=${token}`;

    console.log("Invite created successfully:", { teamMemberId: teamMember.id, inviteId: invite.id });

    return new Response(
      JSON.stringify({
        success: true,
        teamMember,
        invite: {
          ...invite,
          inviteLink,
        },
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
