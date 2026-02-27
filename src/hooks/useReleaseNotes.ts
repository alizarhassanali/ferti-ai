import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { seedReleaseNotes, type ReleaseNote } from '@/data/seedReleaseNotes';

export const useReleaseNotes = () => {
  return useQuery<ReleaseNote[]>({
    queryKey: ['release-notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('release_notes')
        .select('*')
        .order('release_date', { ascending: false });

      if (error) {
        console.warn('Failed to fetch release notes from DB, using seed data:', error.message);
        return seedReleaseNotes;
      }

      if (!data || data.length === 0) {
        return seedReleaseNotes;
      }

      return data as unknown as ReleaseNote[];
    },
    staleTime: 1000 * 60 * 5,
  });
};
