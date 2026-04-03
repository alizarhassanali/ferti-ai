
-- Create feedback table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('general', 'bug_report', 'rating')),
  subject TEXT,
  message TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  screenshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own feedback
CREATE POLICY "Users can insert own feedback"
  ON public.feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all feedback
CREATE POLICY "Admins can view all feedback"
  ON public.feedback
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for screenshots
INSERT INTO storage.buckets (id, name, public) VALUES ('feedback-screenshots', 'feedback-screenshots', false);

-- Authenticated users can upload to their own folder
CREATE POLICY "Users can upload feedback screenshots"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'feedback-screenshots' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Authenticated users can read their own uploads
CREATE POLICY "Users can read own feedback screenshots"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'feedback-screenshots' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Admins can read all feedback screenshots
CREATE POLICY "Admins can read all feedback screenshots"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'feedback-screenshots' AND public.has_role(auth.uid(), 'admin'));
