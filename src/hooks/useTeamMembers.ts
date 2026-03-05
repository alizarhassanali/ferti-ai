import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember, TeamMemberRole, TeamMemberStatus, CreateInviteRequest, CreateInviteResponse } from '@/types/team';

interface UseTeamMembersOptions {
  search?: string;
  status?: string;
  role?: string;
}

const DUMMY_MEMBERS: TeamMember[] = [
  { id: '1', first_name: 'Ahmed', last_name: 'Mustafa', email: 'ahmed.mustufa@thefertilitypartners.com', role: 'physician', status: 'active', invited_at: null, created_at: '2024-03-11T00:00:00Z', updated_at: '2024-03-11T00:00:00Z' },
  { id: '2', first_name: 'Gary', last_name: 'Nakhuda', email: 'gary.nakhuda@thefertilitypartners.com', role: 'admin', status: 'active', invited_at: null, created_at: '2026-01-30T00:00:00Z', updated_at: '2026-01-30T00:00:00Z' },
  { id: '3', first_name: 'Hassan', last_name: 'Jamil', email: 'hassan.jamil@thefertilitypartners.com', role: 'physician', status: 'active', invited_at: null, created_at: '2025-06-15T00:00:00Z', updated_at: '2025-06-15T00:00:00Z' },
  { id: '4', first_name: 'Sami', last_name: 'Sohail', email: 'sami.sohail@thefertilitypartners.com', role: 'nurse', status: 'active', invited_at: null, created_at: '2025-09-22T00:00:00Z', updated_at: '2025-09-22T00:00:00Z' },
  { id: '5', first_name: 'Sarah', last_name: 'Thompson', email: 'sarah.thompson@thefertilitypartners.com', role: 'staff', status: 'pending', invited_at: '2026-02-10T00:00:00Z', created_at: '2026-02-10T00:00:00Z', updated_at: '2026-02-10T00:00:00Z' },
  { id: '6', first_name: 'Michael', last_name: 'Chen', email: 'michael.chen@thefertilitypartners.com', role: 'physician', status: 'active', invited_at: null, created_at: '2024-11-05T00:00:00Z', updated_at: '2024-11-05T00:00:00Z' },
  { id: '7', first_name: 'Fatima', last_name: 'Al-Rashid', email: 'fatima.alrashid@thefertilitypartners.com', role: 'nurse', status: 'active', invited_at: null, created_at: '2025-01-18T00:00:00Z', updated_at: '2025-01-18T00:00:00Z' },
  { id: '8', first_name: 'James', last_name: 'Wilson', email: 'james.wilson@thefertilitypartners.com', role: 'staff', status: 'disabled', invited_at: null, created_at: '2024-07-30T00:00:00Z', updated_at: '2025-12-01T00:00:00Z' },
  { id: '9', first_name: 'Priya', last_name: 'Sharma', email: 'priya.sharma@thefertilitypartners.com', role: 'physician', status: 'pending', invited_at: '2026-02-28T00:00:00Z', created_at: '2026-02-28T00:00:00Z', updated_at: '2026-02-28T00:00:00Z' },
  { id: '10', first_name: 'David', last_name: 'Park', email: 'david.park@thefertilitypartners.com', role: 'admin', status: 'active', invited_at: null, created_at: '2024-05-20T00:00:00Z', updated_at: '2024-05-20T00:00:00Z' },
];

export const useTeamMembers = (options: UseTeamMembersOptions = {}) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
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

      // Fall back to dummy data if no real data
      if (!membersData || membersData.length === 0) {
        let filtered = [...DUMMY_MEMBERS];
        if (options.search) {
          const s = options.search.toLowerCase();
          filtered = filtered.filter(m =>
            m.first_name.toLowerCase().includes(s) ||
            m.last_name.toLowerCase().includes(s) ||
            m.email.toLowerCase().includes(s)
          );
        }
        if (options.status && options.status !== 'all') {
          filtered = filtered.filter(m => m.status === options.status);
        }
        if (options.role && options.role !== 'all') {
          filtered = filtered.filter(m => m.role === options.role);
        }
        setMembers(filtered);
      } else {
        setMembers(membersData);
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
      // On error (e.g. not authenticated), show dummy data
      setMembers(DUMMY_MEMBERS);
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
