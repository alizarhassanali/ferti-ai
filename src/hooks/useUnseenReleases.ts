import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { seedReleaseNotes } from '@/data/seedReleaseNotes';

export const useUnseenReleases = () => {
  return useQuery<boolean>({
    queryKey: ['unseen-releases'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();

      // If no user logged in, check seed data — always show badge
      if (!user) {
        const lastSeen = localStorage.getItem('release-notes-last-seen');
        if (!lastSeen) return true;
        const latestDate = seedReleaseNotes[0]?.release_date;
        return latestDate ? new Date(latestDate) > new Date(lastSeen) : false;
      }

      // Get latest release date
      const { data: releases } = await supabase
        .from('release_notes')
        .select('release_date')
        .order('release_date', { ascending: false })
        .limit(1);

      const latestReleaseDate = (releases as unknown as { release_date: string }[])?.[0]?.release_date
        || seedReleaseNotes[0]?.release_date;

      if (!latestReleaseDate) return false;

      // Get user's last seen
      const { data: dismissed } = await supabase
        .from('release_notes_dismissed')
        .select('last_seen_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!dismissed) return true;

      const lastSeenRecord = dismissed as unknown as { last_seen_at: string };
      return new Date(latestReleaseDate) > new Date(lastSeenRecord.last_seen_at);
    },
    staleTime: 1000 * 60 * 2,
  });
};

export const markReleasesSeen = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    localStorage.setItem('release-notes-last-seen', new Date().toISOString());
    return;
  }

  await (supabase as any)
    .from('release_notes_dismissed')
    .upsert(
      { user_id: user.id, last_seen_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
};
