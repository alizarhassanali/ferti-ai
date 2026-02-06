
-- Create app_role enum (matching existing team_member_role values)
CREATE TYPE public.app_role AS ENUM ('admin', 'physician', 'nurse', 'staff');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Service role has full access (for edge functions)
CREATE POLICY "Service role full access on user_roles"
ON public.user_roles FOR ALL
USING (auth.role() = 'service_role');

-- Create has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Trigger to sync roles from user_profiles to user_roles
CREATE OR REPLACE FUNCTION public.sync_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.user_roles WHERE user_id = NEW.user_id;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.user_id, NEW.role::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER sync_user_role_trigger
AFTER INSERT OR UPDATE OF role ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_user_role();

-- Seed user_roles from existing user_profiles
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, role::app_role FROM public.user_profiles
WHERE role IN ('admin', 'physician', 'nurse', 'staff')
ON CONFLICT (user_id, role) DO NOTHING;

-- ============================
-- Fix team_members RLS
-- ============================
DROP POLICY IF EXISTS "Anyone can view team members" ON public.team_members;
DROP POLICY IF EXISTS "Anyone can insert team members" ON public.team_members;
DROP POLICY IF EXISTS "Anyone can update team members" ON public.team_members;

-- Only authenticated users can view team members
CREATE POLICY "Authenticated users can view team members"
ON public.team_members FOR SELECT
TO authenticated
USING (true);

-- Only service role can insert (via edge functions)
CREATE POLICY "Service role can insert team members"
ON public.team_members FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Only service role can update (via edge functions)
CREATE POLICY "Service role can update team members"
ON public.team_members FOR UPDATE
USING (auth.role() = 'service_role');

-- ============================
-- Fix invites RLS
-- ============================
DROP POLICY IF EXISTS "Anyone can view invites" ON public.invites;
DROP POLICY IF EXISTS "Anyone can insert invites" ON public.invites;
DROP POLICY IF EXISTS "Anyone can update invites" ON public.invites;

-- Only service role for all invite operations (all access via edge functions)
CREATE POLICY "Service role can view invites"
ON public.invites FOR SELECT
USING (auth.role() = 'service_role');

CREATE POLICY "Service role can insert invites"
ON public.invites FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update invites"
ON public.invites FOR UPDATE
USING (auth.role() = 'service_role');

-- ============================
-- Fix referring_physicians write policies
-- ============================
CREATE POLICY "Admin or staff can insert physicians"
ON public.referring_physicians FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admin or staff can update physicians"
ON public.referring_physicians FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Only admins can delete physicians"
ON public.referring_physicians FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
