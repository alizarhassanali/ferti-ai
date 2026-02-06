import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember, TeamMemberRole, TeamMemberStatus, CreateInviteRequest, CreateInviteResponse } from '@/types/team';

interface UseTeamMembersOptions {
  search?: string;
  status?: string;
  role?: string;
}

export const useTeamMembers = (options: UseTeamMembersOptions = {}) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Query team_members directly (RLS now restricts to authenticated users)
      let query = supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (options.search) {
        query = query.or(`first_name.ilike.%${options.search}%,last_name.ilike.%${options.search}%,email.ilike.%${options.search}%`);
      }

      if (options.status && options.status !== 'all') {
        query = query.eq('status', options.status as TeamMemberStatus);
      }

      if (options.role && options.role !== 'all') {
        query = query.eq('role', options.role as TeamMemberRole);
      }

      const { data: membersData, error: queryError } = await query;

      if (queryError) {
        throw queryError;
      }

      setMembers(membersData || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err instanceof Error ? err.message : 'Failed to load team members');
    } finally {
      setIsLoading(false);
    }
  }, [options.search, options.status, options.role]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, isLoading, error, refetch: fetchMembers };
};

export const useCreateInvite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvite = async (request: CreateInviteRequest): Promise<CreateInviteResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-invite', {
        method: 'POST',
        body: request,
      });

      if (fnError) {
        throw fnError;
      }

      if (data.error) {
        setError(data.error);
        return null;
      }

      return data as CreateInviteResponse;
    } catch (err) {
      console.error('Error creating invite:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create invite';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createInvite, isLoading, error, setError };
};
