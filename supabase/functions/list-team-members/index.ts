import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VALID_STATUSES = ["all", "pending", "active", "disabled"];
const VALID_ROLES = ["all", "admin", "physician", "nurse", "staff"];

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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

    // ---- Input validation ----
    const url = new URL(req.url);
    const search = (url.searchParams.get("search") || "").slice(0, 200);
    const status = url.searchParams.get("status") || "";
    const role = url.searchParams.get("role") || "";

    // Validate status and role params
    if (status && !VALID_STATUSES.includes(status)) {
      return new Response(
        JSON.stringify({ error: "Invalid status filter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (role && !VALID_ROLES.includes(role)) {
      return new Response(
        JSON.stringify({ error: "Invalid role filter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let query = supabase
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: false });

    // Apply search filter (sanitized by Supabase SDK parameterized queries)
    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Apply status filter
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Apply role filter
    if (role && role !== "all") {
      query = query.eq("role", role);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching team members:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch team members" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(data || []),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
