import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALLOWED_FIELDS = new Set([
  "first_name",
  "last_name",
  "phone_country_code",
  "phone_number",
  "language",
  "signature_title",
  "signature_specialty",
  "signature_preferred_name",
  "signature_email",
  "include_clinic_name",
  "profile_completed",
]);

const MAX_STRING_LENGTH = 255;
const VALID_LANGUAGES = ["English", "French", "Spanish", "German", "Portuguese", "Italian", "Dutch", "Arabic", "Chinese", "Japanese", "Korean"];

function validateStringField(value: unknown, maxLen = MAX_STRING_LENGTH): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return null;
  return value.slice(0, maxLen).trim();
}

function isValidPhoneCountryCode(code: unknown): boolean {
  if (typeof code !== "string") return false;
  return /^\+\d{1,4}$/.test(code);
}

function isValidPhoneNumber(phone: unknown): boolean {
  if (typeof phone !== "string") return false;
  return /^[\d\s\-().]{0,20}$/.test(phone);
}

function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 255;
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

    // ---- Input validation ----
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const inputData = rawBody as Record<string, unknown>;

    // Only allow whitelisted fields
    const sanitizedData: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(inputData)) {
      if (!ALLOWED_FIELDS.has(key)) continue;

      switch (key) {
        case "first_name":
        case "last_name": {
          const v = validateStringField(value, 100);
          if (v !== null) sanitizedData[key] = v;
          break;
        }
        case "phone_country_code":
          if (value === null || (typeof value === "string" && isValidPhoneCountryCode(value))) {
            sanitizedData[key] = value;
          }
          break;
        case "phone_number":
          if (value === null || (typeof value === "string" && isValidPhoneNumber(value))) {
            sanitizedData[key] = value;
          }
          break;
        case "language":
          if (typeof value === "string" && VALID_LANGUAGES.includes(value)) {
            sanitizedData[key] = value;
          }
          break;
        case "signature_email":
          if (value === null || (typeof value === "string" && isValidEmail(value))) {
            sanitizedData[key] = value;
          }
          break;
        case "signature_title":
        case "signature_specialty":
        case "signature_preferred_name": {
          const v = validateStringField(value);
          if (v !== null) sanitizedData[key] = v;
          break;
        }
        case "include_clinic_name":
        case "profile_completed":
          if (typeof value === "boolean") {
            sanitizedData[key] = value;
          }
          break;
      }
    }

    if (Object.keys(sanitizedData).length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid fields to update" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
          ...sanitizedData,
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
          ...sanitizedData,
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
