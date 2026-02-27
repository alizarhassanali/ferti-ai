export interface ReleaseNote {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  release_date: string;
  tag: 'new' | 'improvement' | 'fix';
  image_url: string | null;
  created_at: string;
}

export const seedReleaseNotes: ReleaseNote[] = [
  {
    id: 'seed-1',
    title: 'AI-Powered Note Generation',
    summary: 'Generate clinical notes automatically from session recordings using our new AI engine.',
    description: 'Our AI engine now listens to your session recordings and produces structured clinical notes in seconds. Supports multiple note templates and languages. Simply record your session, review the transcript, and let Otto generate the note for you.',
    release_date: '2026-02-25',
    tag: 'new',
    image_url: null,
    created_at: '2026-02-25T00:00:00Z',
  },
  {
    id: 'seed-2',
    title: 'Template Hub Launch',
    summary: 'Browse and install community-built templates from the new Template Hub.',
    description: 'The Template Hub is a curated marketplace of note templates created by clinicians. Browse by specialty, preview templates before installing, and customize them to fit your workflow.',
    release_date: '2026-02-20',
    tag: 'new',
    image_url: null,
    created_at: '2026-02-20T00:00:00Z',
  },
  {
    id: 'seed-3',
    title: 'Improved Dictation Accuracy',
    summary: 'Medical terminology recognition improved by 30% across all supported languages.',
    description: 'We retrained our speech-to-text models with expanded medical vocabularies covering cardiology, oncology, and reproductive medicine. Expect fewer corrections and faster turnaround.',
    release_date: '2026-02-15',
    tag: 'improvement',
    image_url: null,
    created_at: '2026-02-15T00:00:00Z',
  },
  {
    id: 'seed-4',
    title: 'Letter Editor Enhancements',
    summary: 'Rich text toolbar, PDF export, and auto-save now available in the Letters module.',
    description: 'The Letters editor now includes a full formatting toolbar, one-click PDF export, and automatic saving as you type. No more lost drafts.',
    release_date: '2026-02-10',
    tag: 'improvement',
    image_url: null,
    created_at: '2026-02-10T00:00:00Z',
  },
  {
    id: 'seed-5',
    title: 'Session Recording Bug Fix',
    summary: 'Fixed an issue where recordings occasionally failed to save on slower connections.',
    description: 'We identified and resolved a race condition in the upload pipeline that caused recordings to silently fail on connections below 1 Mbps. Retry logic has been added as a safety net.',
    release_date: '2026-02-05',
    tag: 'fix',
    image_url: null,
    created_at: '2026-02-05T00:00:00Z',
  },
];
