-- Create enum for user roles
CREATE TYPE public.team_member_role AS ENUM ('admin', 'physician', 'nurse', 'staff');

-- Create enum for member status
CREATE TYPE public.team_member_status AS ENUM ('pending', 'active', 'disabled');

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role team_member_role NOT NULL DEFAULT 'staff',
  status team_member_status NOT NULL DEFAULT 'pending',
  invited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invites table
CREATE TABLE public.invites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  role_to_assign team_member_role NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_by_user_id UUID,
  team_member_id UUID REFERENCES public.team_members(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Create policies for team_members (for now, allow all authenticated users to view)
CREATE POLICY "Anyone can view team members"
ON public.team_members
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert team members"
ON public.team_members
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update team members"
ON public.team_members
FOR UPDATE
USING (true);

-- Create policies for invites
CREATE POLICY "Anyone can view invites"
ON public.invites
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert invites"
ON public.invites
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update invites"
ON public.invites
FOR UPDATE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_team_member_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_team_member_updated_at();

-- Create index for faster email lookups
CREATE INDEX idx_team_members_email ON public.team_members(email);
CREATE INDEX idx_invites_token ON public.invites(token);
CREATE INDEX idx_invites_email ON public.invites(email);