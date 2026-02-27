
-- Create enum for release note tags
CREATE TYPE public.release_note_tag AS ENUM ('new', 'improvement', 'fix');

-- Create release_notes table
CREATE TABLE public.release_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  release_date DATE NOT NULL DEFAULT CURRENT_DATE,
  tag release_note_tag NOT NULL DEFAULT 'new',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.release_notes ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read
CREATE POLICY "Authenticated users can view release notes"
  ON public.release_notes FOR SELECT
  USING (auth.role() = 'authenticated');

-- Service role can manage
CREATE POLICY "Service role can manage release notes"
  ON public.release_notes FOR ALL
  USING (auth.role() = 'service_role');

-- Create release_notes_dismissed table
CREATE TABLE public.release_notes_dismissed (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  last_seen_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.release_notes_dismissed ENABLE ROW LEVEL SECURITY;

-- Users can read their own row
CREATE POLICY "Users can view own dismissal"
  ON public.release_notes_dismissed FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own row
CREATE POLICY "Users can insert own dismissal"
  ON public.release_notes_dismissed FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own row
CREATE POLICY "Users can update own dismissal"
  ON public.release_notes_dismissed FOR UPDATE
  USING (auth.uid() = user_id);

-- Seed release notes with demo data
INSERT INTO public.release_notes (title, summary, description, release_date, tag) VALUES
  ('AI-Powered Note Generation', 'Generate clinical notes automatically from session recordings using our new AI engine.', 'Our AI engine now listens to your session recordings and produces structured clinical notes in seconds. Supports multiple note templates and languages. Simply record your session, review the transcript, and let Otto generate the note for you.', '2026-02-25', 'new'),
  ('Template Hub Launch', 'Browse and install community-built templates from the new Template Hub.', 'The Template Hub is a curated marketplace of note templates created by clinicians. Browse by specialty, preview templates before installing, and customize them to fit your workflow.', '2026-02-20', 'new'),
  ('Improved Dictation Accuracy', 'Medical terminology recognition improved by 30% across all supported languages.', 'We retrained our speech-to-text models with expanded medical vocabularies covering cardiology, oncology, and reproductive medicine. Expect fewer corrections and faster turnaround.', '2026-02-15', 'improvement'),
  ('Letter Editor Enhancements', 'Rich text toolbar, PDF export, and auto-save now available in the Letters module.', 'The Letters editor now includes a full formatting toolbar, one-click PDF export, and automatic saving as you type. No more lost drafts.', '2026-02-10', 'improvement'),
  ('Session Recording Bug Fix', 'Fixed an issue where recordings occasionally failed to save on slower connections.', 'We identified and resolved a race condition in the upload pipeline that caused recordings to silently fail on connections below 1 Mbps. Retry logic has been added as a safety net.', '2026-02-05', 'fix');
