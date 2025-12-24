export type TeamMemberRole = 'admin' | 'physician' | 'nurse' | 'staff';
export type TeamMemberStatus = 'pending' | 'active' | 'disabled';

export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: TeamMemberRole;
  status: TeamMemberStatus;
  invited_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Invite {
  id: string;
  email: string;
  token: string;
  role_to_assign: TeamMemberRole;
  expires_at: string;
  used_at: string | null;
  created_by_user_id: string | null;
  team_member_id: string;
  created_at: string;
  inviteLink?: string;
}

export interface CreateInviteRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: TeamMemberRole;
}

export interface CreateInviteResponse {
  success: boolean;
  teamMember: TeamMember;
  invite: Invite;
}
