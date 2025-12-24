import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ReferringPhysician } from '@/types/session';

interface UsePhysicianSearchResult {
  results: ReferringPhysician[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => void;
  clearResults: () => void;
}

export const usePhysicianSearch = (): UsePhysicianSearchResult => {
  const [results, setResults] = useState<ReferringPhysician[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback((query: string) => {
    // Clear any pending debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Clear results if query is too short
    if (query.length < 2) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Debounce the search by 300ms
    debounceRef.current = setTimeout(async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke('search-physicians', {
          body: null,
          method: 'GET',
        }).then(() => {
          // Functions.invoke doesn't support GET with query params well, 
          // so we'll use fetch directly
          return fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search-physicians?query=${encodeURIComponent(query)}&limit=10`,
            {
              headers: {
                'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                'Content-Type': 'application/json',
              },
            }
          ).then(res => res.json());
        });

        if (fnError || error) {
          setError("Couldn't load results. Retry.");
          setResults([]);
        } else {
          setResults(data || []);
        }
      } catch (e) {
        console.error('Physician search error:', e);
        setError("Couldn't load results. Retry.");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, isLoading, error, search, clearResults };
};