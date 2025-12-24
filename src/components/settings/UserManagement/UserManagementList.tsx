import { useState, useMemo } from 'react';
import { Search, ChevronDown, ArrowUpDown, Plus } from 'lucide-react';
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
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { TeamMember, TeamMemberRole, TeamMemberStatus } from '@/types/team';

interface UserManagementListProps {
  onAddMember: () => void;
}

type SortField = 'name' | 'status';
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

  const { members, isLoading, error } = useTeamMembers({
    search,
    status: statusFilter,
    role: roleFilter,
  });

  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        comparison = nameA.localeCompare(nameB);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage team members and their access</p>
        </div>
        <Button onClick={onAddMember} className="gap-2">
          <Plus className="h-4 w-4" />
          New Member
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-end gap-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Name, email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {statusOptions.find(s => s.value === statusFilter)?.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
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
            <Button variant="outline" className="gap-2">
              {roleOptions.find(r => r.value === roleFilter)?.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Loading team members...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : sortedMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
