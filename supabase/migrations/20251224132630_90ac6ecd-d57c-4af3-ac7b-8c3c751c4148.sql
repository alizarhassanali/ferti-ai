-- Create user_profiles table for storing user profile and signature data
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone_country_code TEXT DEFAULT '+1',
  phone_number TEXT,
  role TEXT NOT NULL DEFAULT 'staff',
  language TEXT DEFAULT 'English',
  -- Signature settings (primarily for physicians)
  signature_title TEXT,
  signature_specialty TEXT,
  signature_preferred_name TEXT,
  signature_email TEXT,
  include_clinic_name BOOLEAN DEFAULT false,
  -- Profile completion tracking
  profile_completed BOOLEAN DEFAULT false,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view their own profile"
ON public.user_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.user_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Service role can do everything (for edge functions)
CREATE POLICY "Service role full access"
ON public.user_profiles
FOR ALL
USING (auth.role() = 'service_role');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_team_member_updated_at();

-- Add profile_completed column to invites to track if user needs to complete profile
ALTER TABLE public.invites ADD COLUMN IF NOT EXISTS requires_profile_completion BOOLEAN DEFAULT true;