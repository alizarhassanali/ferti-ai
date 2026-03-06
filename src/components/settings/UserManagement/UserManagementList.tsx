import { useState, useMemo } from 'react';
import { Search, ChevronDown, ArrowUpDown, Plus, MoreVertical, Pencil, Trash2, Ban, CheckCircle2, Mail } from 'lucide-react';
import { showSuccessToast } from '@/lib/toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTeamMembers, useUpdateMemberStatus } from '@/hooks/useTeamMembers';
import { TeamMember, TeamMemberRole, TeamMemberStatus } from '@/types/team';

interface UserManagementListProps {
  onAddMember: () => void;
}

type SortField = 'name' | 'status' | 'created_at';
type SortDirection = 'asc' | 'desc';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'disabled', label: 'Disabled' },
];

const roleOptions = [
  { value: 'all', label: 'All Roles' },
  { value: 'admin', label: 'Administrator' },
  { value: 'physician', label: 'Physician' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'staff', label: 'Staff' },
];

const getStatusBadgeVariant = (status: TeamMemberStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'active':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'disabled':
      return 'outline';
    default:
      return 'secondary';
  }
};

const getRoleLabel = (role: TeamMemberRole): string => {
  const labels: Record<TeamMemberRole, string> = {
    admin: 'Administrator',
    physician: 'Physician',
    nurse: 'Nurse',
    staff: 'Staff',
  };
  return labels[role] || role;
};

const getStatusLabel = (status: TeamMemberStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const UserManagementList = ({ onAddMember }: UserManagementListProps) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [memberToDisable, setMemberToDisable] = useState<TeamMember | null>(null);

  const { members, isLoading, error, refetch } = useTeamMembers({
    search,
    status: statusFilter,
    role: roleFilter,
  });
  const { updateStatus, isLoading: isUpdatingStatus } = useUpdateMemberStatus();

  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        comparison = nameA.localeCompare(nameB);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortField === 'created_at') {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [members, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">User Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage team members and their access</p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
            <Input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-4 py-2.5 h-11 rounded-xl"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all border bg-white text-foreground border-border hover:bg-muted">
                {statusOptions.find(s => s.value === statusFilter)?.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover">
              {statusOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all border bg-white text-foreground border-border hover:bg-muted">
                {roleOptions.find(r => r.value === roleFilter)?.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover">
              {roleOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setRoleFilter(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button onClick={onAddMember} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Member
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('created_at')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Created At
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Loading team members...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : sortedMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No team members found
                </TableCell>
              </TableRow>
            ) : (
              sortedMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    {member.first_name} {member.last_name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.email}
                  </TableCell>
                  <TableCell>
                    {getRoleLabel(member.role)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(member.status)}>
                      {getStatusLabel(member.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(member.created_at), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem className="gap-2">
                          <Pencil className="h-4 w-4" />
                          Edit user
                        </DropdownMenuItem>
                        {member.status === 'disabled' ? (
                          <>
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={async () => {
                                const success = await updateStatus(member.id, 'active');
                                if (success) {
                                  showSuccessToast(`${member.first_name} ${member.last_name} has been enabled.`);
                                  refetch();
                                }
                              }}
                              disabled={isUpdatingStatus}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Enable user
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 text-destructive focus:text-destructive"
                              onClick={() => setMemberToDelete(member)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete user
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => setMemberToDisable(member)}
                          >
                            <Ban className="h-4 w-4" />
                            Disable user
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!memberToDelete} onOpenChange={(open) => !open && setMemberToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{' '}
              <span className="font-medium text-foreground">
                {memberToDelete?.first_name} {memberToDelete?.last_name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                showSuccessToast(`${memberToDelete?.first_name} ${memberToDelete?.last_name} has been deleted.`);
                setMemberToDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!memberToDisable} onOpenChange={(open) => !open && setMemberToDisable(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disable{' '}
              <span className="font-medium text-foreground">
                {memberToDisable?.first_name} {memberToDisable?.last_name}
              </span>
              ? They will lose access until re-enabled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const member = memberToDisable;
                setMemberToDisable(null);
                if (member) {
                  const success = await updateStatus(member.id, 'disabled');
                  if (success) {
                    showSuccessToast(`${member.first_name} ${member.last_name} has been disabled.`);
                    refetch();
                  }
                }
              }}
            >
              Disable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
