import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VALID_ROLES = ["admin", "physician", "nurse", "staff"] as const;
type ValidRole = typeof VALID_ROLES[number];

function isValidRole(role: string): role is ValidRole {
  return VALID_ROLES.includes(role as ValidRole);
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 255;
}

function isValidName(name: string): boolean {
  return name.length >= 1 && name.length <= 100 && /^[\p{L}\s'.-]+$/u.test(name);
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

    // ---- Authentication ----
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ---- Admin role check ----
    const { data: userRoles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id);

    const isAdmin = userRoles?.some((r: { role: string }) => r.role === "admin");
    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ---- Input validation ----
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { firstName, lastName, email, role } = body as Record<string, unknown>;

    if (typeof firstName !== "string" || !isValidName(firstName.trim())) {
      return new Response(
        JSON.stringify({ error: "Invalid first name (1-100 characters, letters only)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (typeof lastName !== "string" || !isValidName(lastName.trim())) {
      return new Response(
        JSON.stringify({ error: "Invalid last name (1-100 characters, letters only)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (typeof email !== "string" || !isValidEmail(email.trim())) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (typeof role !== "string" || !isValidRole(role)) {
      return new Response(
        JSON.stringify({ error: "Invalid role" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sanitizedFirstName = firstName.trim();
    const sanitizedLastName = lastName.trim();
    const sanitizedEmail = email.trim().toLowerCase();

    console.log("Creating invite for:", { firstName: sanitizedFirstName, lastName: sanitizedLastName, email: sanitizedEmail, role, createdBy: userData.user.id });

    // Check if email already exists
    const { data: existingMember } = await supabase
      .from("team_members")
      .select("id")
      .eq("email", sanitizedEmail)
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
        first_name: sanitizedFirstName,
        last_name: sanitizedLastName,
        email: sanitizedEmail,
        role: role,
        status: "pending",
        invited_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (memberError) {
      console.error("Error creating team member:", memberError);
      return new Response(
        JSON.stringify({ error: "Failed to create team member" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate invite token
    const inviteToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    // Create invite record
    const { data: invite, error: inviteError } = await supabase
      .from("invites")
      .insert({
        email: sanitizedEmail,
        token: inviteToken,
        role_to_assign: role,
        expires_at: expiresAt.toISOString(),
        team_member_id: teamMember.id,
        created_by_user_id: userData.user.id,
      })
      .select()
      .single();

    if (inviteError) {
      console.error("Error creating invite:", inviteError);
      return new Response(
        JSON.stringify({ error: "Failed to create invite" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate invite link (using the app's URL)
    const inviteLink = `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '')}/invite?token=${inviteToken}`;

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
