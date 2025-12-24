-- Create table for referring physicians
CREATE TABLE public.referring_physicians (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  clinic_name TEXT,
  city TEXT,
  province TEXT,
  specialty TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster text search
CREATE INDEX idx_referring_physicians_names ON public.referring_physicians 
  USING gin(to_tsvector('english', first_name || ' ' || last_name));

CREATE INDEX idx_referring_physicians_active ON public.referring_physicians(active);

-- Enable Row Level Security
ALTER TABLE public.referring_physicians ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (physicians are public data)
CREATE POLICY "Anyone can view active physicians" 
ON public.referring_physicians 
FOR SELECT 
USING (active = true);

-- Seed with some sample data
INSERT INTO public.referring_physicians (first_name, last_name, clinic_name, city, province, specialty) VALUES
  ('Michael', 'Chen', 'Downtown Medical Center', 'Toronto', 'Ontario', 'Family Medicine'),
  ('Sarah', 'Smith', 'Westside Family Practice', 'Vancouver', 'BC', 'Family Medicine'),
  ('David', 'Johnson', 'Central Healthcare', 'Calgary', 'Alberta', 'Internal Medicine'),
  ('Emily', 'Williams', 'Lakeside Clinic', 'Ottawa', 'Ontario', 'Pediatrics'),
  ('Robert', 'Brown', 'Metro Health Services', 'Montreal', 'Quebec', 'Cardiology'),
  ('Jennifer', 'Davis', 'Northgate Medical', 'Edmonton', 'Alberta', 'Neurology'),
  ('James', 'Wilson', 'Riverdale Family Health', 'Winnipeg', 'Manitoba', 'Family Medicine'),
  ('Lisa', 'Anderson', 'Coastal Medical Group', 'Halifax', 'Nova Scotia', 'Dermatology');