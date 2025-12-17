import { User, Shield, Database, BarChart3, Brain, Monitor } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { UserRole } from '@/types/user';

interface SettingsCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[] | 'all';
}

const settingsCategories: SettingsCategory[] = [
  { id: 'profile', label: 'Profile', icon: User, roles: 'all' },
  { id: 'usage', label: 'Usage', icon: BarChart3, roles: 'all' },
  { id: 'memory-ai', label: 'Memory & AI Settings', icon: Brain, roles: 'all' },
  { id: 'display-controls', label: 'Display Controls', icon: Monitor, roles: 'all' },
  { id: 'security', label: 'Security', icon: Shield, roles: 'all' },
  { id: 'data-settings', label: 'Data Management', icon: Database, roles: 'all' },
];

export const MiddlePane = () => {
  const { selectedCategory, setSelectedCategory, user } = useSettings();

  const visibleCategories = settingsCategories.filter(category => {
    if (category.roles === 'all') return true;
    return category.roles.includes(user.role);
  });

  return (
    <div className="w-72 h-screen bg-muted border-r border-border">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <h2 className="text-xl font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account and preferences</p>
      </div>

      <nav className="px-3">
        <ul className="space-y-0.5">
          {visibleCategories.map(category => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <li key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-150
                    ${isActive
                      ? 'bg-white text-foreground shadow-sm'
                      : 'text-foreground/80 hover:bg-white/60 hover:text-foreground'
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 stroke-[1.5] ${isActive ? 'text-foreground' : 'text-foreground/60'}`} />
                  <span>{category.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
