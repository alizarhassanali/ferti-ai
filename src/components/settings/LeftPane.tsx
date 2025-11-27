import { useState } from 'react';
import { User, FileText, MessageSquare, FileCode, Store, Settings, HelpCircle, Plus, ChevronDown, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import { useSessionsLayout } from '@/contexts/SessionsLayoutContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import { HelpPanel } from '@/components/help/HelpPanel';

// Mock user - in production, this would come from auth context
const mockUser = {
  name: "Dr. Shahid Saya",
  email: "shahid.saya@fertilitypartners.ca",
  role: 'Physician' as const,
  clinic: "Fertility Partners - Toronto",
  profileImage: undefined,
};

export const LeftPane = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = mockUser;
  const [helpPanelOpen, setHelpPanelOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  // Try to get sessions layout context (only available on /sessions route)
  let sessionsLayout;
  try {
    sessionsLayout = useSessionsLayout();
  } catch {
    // Not on sessions page, context not available
    sessionsLayout = null;
  }

  const isSessionsPage = location.pathname === '/sessions';
  const isSessionsListVisible = sessionsLayout?.isSessionsListVisible ?? true;

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const navItems = [
    { icon: Plus, label: 'New session', id: 'new-session', route: '/new-session' },
    { 
      icon: FileText, 
      label: isSessionsPage && !isSessionsListVisible ? 'View sessions' : 'View sessions', 
      id: 'sessions', 
      route: '/sessions',
      isToggleable: true
    },
    { type: 'separator' },
    { icon: FileCode, label: 'Chart Prep', id: 'chart-prep' },
    { icon: MessageSquare, label: 'AI Assistant', id: 'ai-assistant' },
    { type: 'separator' },
    { label: 'Templates', type: 'header' },
    { icon: FileText, label: 'My Templates', id: 'my-templates', route: '/my-templates' },
    { icon: Store, label: 'Template Hub', id: 'template-hub' },
    { type: 'separator' },
    { icon: Settings, label: 'Settings', id: 'settings', route: '/settings' },
    { type: 'separator' },
    { icon: HelpCircle, label: 'Help', id: 'help' },
  ];

  return (
    <>
      <div className={`h-screen bg-nav border-r border-nav-border flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      {/* User Profile Section */}
      <div className="p-4 border-b border-nav-border relative overflow-hidden">
        <div className={`flex items-center mb-2 ${isCollapsed ? 'justify-center' : 'justify-between pr-8'}`}>
          {!isCollapsed && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex-1 min-w-0">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-nav-hover cursor-pointer group">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0 overflow-hidden">
                    <div className="font-semibold text-sm text-foreground truncate">{user.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[150px]">{user.email}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">{user.clinic}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground flex-shrink-0" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem disabled className="opacity-50">
                  <span className="text-xs">Switch Clinic (Coming Soon)</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {isCollapsed && (
            <div className="flex items-center justify-center w-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImage} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSidebar}
                  className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-nav-hover text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isCollapsed ? "Expand sidebar" : "Minimise sidebar"}
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsed ? '-rotate-90' : 'rotate-90'}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isCollapsed ? "Expand sidebar" : "Minimise sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item, index) => {
            if (item.type === 'separator') {
              return <li key={`sep-${index}`} className="h-px bg-nav-border my-2" />;
            }

            if (item.type === 'header') {
              return !isCollapsed ? (
                <li key={item.label} className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </li>
              ) : (
                <li key={item.label} className="h-px bg-nav-border my-2" />
              );
            }

            const Icon = item.icon!;
            const isActive = item.route ? location.pathname === item.route : false;

            // Determine label and arrow for toggleable items (View sessions)
            const displayLabel = item.isToggleable && isSessionsPage
              ? (isSessionsListVisible ? 'Hide sessions' : 'View sessions')
              : item.label;
            
            const ArrowIcon = item.isToggleable && isSessionsPage
              ? (isSessionsListVisible ? ChevronLeft : ChevronRight)
              : null;

            const handleClick = () => {
              if (item.id === 'help') {
                setHelpPanelOpen(true);
              } else if (item.id === 'sessions' && isSessionsPage && sessionsLayout) {
                // Toggle sessions list if we're already on the sessions page
                sessionsLayout.toggleSessionsList();
              } else if (item.route) {
                navigate(item.route);
              }
            };

            return (
              <li key={item.id}>
                {isCollapsed ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleClick}
                          className={`
                            w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium
                            transition-colors
                            ${isActive
                              ? 'bg-nav-active text-primary border-l-3 border-primary font-semibold'
                              : 'text-foreground hover:bg-nav-hover'
                            }
                          `}
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{displayLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <button
                    onClick={handleClick}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                      transition-colors
                      ${isActive
                        ? 'bg-nav-active text-primary border-l-3 border-primary font-semibold'
                        : 'text-foreground hover:bg-nav-hover'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{displayLabel}</span>
                    {ArrowIcon && <ArrowIcon className="h-4 w-4 text-muted-foreground" />}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      </div>
      
      <HelpPanel open={helpPanelOpen} onOpenChange={setHelpPanelOpen} />
    </>
  );
};
