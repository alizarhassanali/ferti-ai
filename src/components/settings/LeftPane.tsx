import { useState } from 'react';
import { Users, FileText, MessageSquare, FileCode, Store, Settings, HelpCircle, Plus, ChevronDown, LogOut, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';
import { useSessionsPanel } from '@/contexts/SessionsPanelContext';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  // Get global sessions panel context
  const { 
    sessionsPaneOpen,
    toggleSessionsPanel, 
    isSessionsPanelAllowed 
  } = useSessionsPanel();

  const isSessionsPage = location.pathname === '/sessions';

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
      label: 'View sessions', 
      id: 'sessions', 
      route: '/sessions',
      isToggleable: true
    },
    { type: 'separator' },
    { icon: FileCode, label: 'Chart Prep', id: 'chart-prep' },
    { icon: MessageSquare, label: 'AI Assistant', id: 'ai-assistant' },
    { type: 'separator' },
    { icon: Users, label: 'Team', id: 'team', route: '/team' },
    { type: 'separator' },
    { label: 'Templates', type: 'header' },
    { icon: FileText, label: 'My Templates', id: 'my-templates', route: '/my-templates' },
    { icon: Store, label: 'Template Hub', id: 'template-hub', route: '/template-hub' },
    { type: 'separator' },
    { icon: Settings, label: 'Settings', id: 'settings', route: '/settings' },
  ];

  const footerItems = [
    { icon: HelpCircle, label: 'Help', id: 'help' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-[hsl(38_35%_96%)] text-[hsl(25_30%_35%)] hover:bg-[hsl(38_30%_92%)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[hsl(25_30%_15%)/40] backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        h-screen bg-[hsl(38_35%_96%)] flex flex-col transition-all duration-[250ms] ease-out
        shadow-[2px_0_12px_rgba(0,0,0,0.04)] rounded-r-2xl
        ${isCollapsed ? 'w-[72px]' : 'w-64'}
        hidden md:flex
        ${isMobileMenuOpen ? '!flex fixed inset-y-0 left-0 z-50 w-64 rounded-r-2xl' : ''}
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden absolute top-5 right-4 z-10 p-2 rounded-xl hover:bg-[hsl(38_30%_90%)] text-[hsl(25_20%_50%)] hover:text-[hsl(25_30%_30%)] transition-all"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        {/* User Profile Section */}
        <div className={`border-b border-[hsl(35_20%_90%)] relative ${isCollapsed ? 'px-3 py-5' : 'px-5 py-6'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex-1 min-w-0 focus:outline-none">
                  <div className="flex items-center gap-3 p-2 -m-2 rounded-xl hover:bg-[hsl(38_30%_92%)] cursor-pointer group transition-all duration-200">
                    <Avatar className="h-10 w-10 flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)] ring-2 ring-white">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback className="bg-[hsl(12_45%_35%)] text-white font-semibold text-sm">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0 overflow-hidden">
                      <div className="font-semibold text-sm text-[hsl(25_30%_22%)] truncate">{user.name}</div>
                      <div className="text-xs text-[hsl(25_15%_55%)] truncate max-w-[140px]">{user.email}</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-[hsl(25_15%_60%)] group-hover:text-[hsl(25_25%_40%)] flex-shrink-0 transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-white border-[hsl(35_20%_88%)] rounded-xl shadow-lg">
                  <DropdownMenuItem disabled className="opacity-50 text-[hsl(25_15%_50%)]">
                    <span className="text-xs">Switch Clinic (Coming Soon)</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[hsl(35_20%_92%)]" />
                  <DropdownMenuItem className="text-[hsl(25_25%_35%)] hover:bg-[hsl(38_30%_95%)] rounded-lg cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {isCollapsed && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center">
                      <Avatar className="h-10 w-10 shadow-[0_2px_8px_rgba(0,0,0,0.1)] ring-2 ring-white cursor-pointer hover:scale-105 transition-transform">
                        <AvatarImage src={user.profileImage} />
                        <AvatarFallback className="bg-[hsl(12_45%_35%)] text-white font-semibold text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-white border-[hsl(35_20%_88%)] text-[hsl(25_30%_25%)] shadow-lg">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-[hsl(25_15%_55%)]">{user.email}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          {/* Collapse Toggle Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSidebar}
                  className={`
                    hidden md:flex absolute items-center justify-center
                    w-7 h-7 rounded-full bg-white border border-[hsl(35_20%_88%)]
                    shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
                    text-[hsl(25_20%_50%)] hover:text-[hsl(25_30%_30%)] hover:bg-[hsl(38_30%_98%)]
                    transition-all duration-200 hover:scale-105
                    ${isCollapsed ? '-right-3.5 top-6' : '-right-3.5 top-7'}
                  `}
                  aria-label={isCollapsed ? "Expand sidebar" : "Minimise sidebar"}
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronLeft className="h-3.5 w-3.5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white border-[hsl(35_20%_88%)] text-[hsl(25_30%_25%)] shadow-lg">
                <p>{isCollapsed ? "Expand sidebar" : "Minimise sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Navigation Items */}
        <nav className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-2 py-4' : 'px-4 py-5'}`}>
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              if (item.type === 'separator') {
                return <li key={`sep-${index}`} className="h-px bg-[hsl(35_20%_90%)] my-3 mx-2" />;
              }

              if (item.type === 'header') {
                return !isCollapsed ? (
                  <li key={item.label} className="px-3 pt-4 pb-2 text-[10px] font-semibold text-[hsl(25_20%_55%)] uppercase tracking-[0.1em]">
                    {item.label}
                  </li>
                ) : (
                  <li key={item.label} className="h-px bg-[hsl(35_20%_90%)] my-3" />
                );
              }

              const Icon = item.icon!;
              const isActive = item.route ? location.pathname === item.route : false;

              // For toggleable items (View sessions), show different label when panel is open
              // and we're on an allowed page (not settings, not /sessions page itself)
              const canToggle = item.isToggleable && isSessionsPanelAllowed && !isSessionsPage;
              const displayLabel = canToggle && sessionsPaneOpen
                ? 'Hide sessions'
                : item.label;
              
              const ArrowIcon = canToggle
                ? (sessionsPaneOpen ? ChevronLeft : ChevronRight)
                : null;

              const handleClick = () => {
                // Close mobile menu when navigating
                setIsMobileMenuOpen(false);
                
                if (item.id === 'help') {
                  setHelpPanelOpen(true);
                } else if (item.id === 'sessions') {
                  // If we're on /sessions page, navigate there
                  // If we're on another allowed page, toggle the sessions panel
                  // If we're on settings, just navigate to /sessions
                  if (isSessionsPage) {
                    // Already on sessions page, do nothing or could navigate
                    navigate('/sessions');
                  } else if (isSessionsPanelAllowed) {
                    // On an allowed page, toggle the panel
                    toggleSessionsPanel();
                  } else {
                    // On a disallowed page (settings), navigate to sessions
                    navigate('/sessions');
                  }
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
                              w-full flex items-center justify-center p-2.5 rounded-xl text-sm
                              transition-all duration-200 group
                              ${isActive
                                ? 'bg-[hsl(35_40%_90%)] text-[hsl(12_45%_35%)] shadow-[0_2px_6px_rgba(0,0,0,0.06)]'
                                : 'text-[hsl(25_20%_40%)] hover:bg-[hsl(38_30%_92%)] hover:text-[hsl(25_30%_25%)]'
                              }
                            `}
                          >
                            <div className={`
                              flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200
                              ${isActive 
                                ? 'bg-[hsl(12_45%_35%)] text-white shadow-[0_2px_8px_rgba(139,69,61,0.25)]' 
                                : 'bg-[hsl(38_25%_93%)] group-hover:bg-[hsl(38_30%_88%)] group-hover:scale-105'
                              }
                            `}>
                              <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.5 : 1.75} />
                            </div>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-white border-[hsl(35_20%_88%)] text-[hsl(25_30%_25%)] shadow-lg font-medium">
                          <p>{displayLabel}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <button
                      onClick={handleClick}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                        transition-all duration-200 group
                        ${isActive
                          ? 'bg-[hsl(35_40%_90%)] text-[hsl(12_45%_35%)] font-semibold shadow-[0_2px_6px_rgba(0,0,0,0.06)]'
                          : 'text-[hsl(25_20%_40%)] hover:bg-[hsl(38_30%_92%)] hover:text-[hsl(25_30%_25%)] font-medium'
                        }
                      `}
                    >
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-[hsl(12_45%_35%)] text-white shadow-[0_2px_8px_rgba(139,69,61,0.25)]' 
                          : 'bg-transparent group-hover:scale-105'
                        }
                      `}>
                        <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.5 : 1.75} />
                      </div>
                      <span className="flex-1 text-left transition-all duration-200">{displayLabel}</span>
                      {ArrowIcon && <ArrowIcon className="h-4 w-4 text-[hsl(25_15%_60%)]" />}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className={`border-t border-[hsl(35_20%_90%)] ${isCollapsed ? 'px-2 py-4' : 'px-4 py-5'}`}>
          <ul className="space-y-1">
            {footerItems.map((item) => {
              const Icon = item.icon;

              const handleClick = () => {
                setIsMobileMenuOpen(false);
                if (item.id === 'help') {
                  setHelpPanelOpen(true);
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
                            className="w-full flex items-center justify-center p-2.5 rounded-xl text-sm transition-all duration-200 group text-[hsl(25_15%_55%)] hover:bg-[hsl(38_30%_92%)] hover:text-[hsl(25_25%_40%)]"
                          >
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 bg-[hsl(38_25%_94%)] group-hover:bg-[hsl(38_30%_88%)] group-hover:scale-105">
                              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                            </div>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-white border-[hsl(35_20%_88%)] text-[hsl(25_30%_25%)] shadow-lg font-medium">
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <button
                      onClick={handleClick}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group text-[hsl(25_15%_50%)] hover:bg-[hsl(38_30%_92%)] hover:text-[hsl(25_25%_35%)] font-medium"
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      
      <HelpPanel open={helpPanelOpen} onOpenChange={setHelpPanelOpen} />
    </>
  );
};
