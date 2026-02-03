import { LayoutGrid } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SwitchAppPopoverProps {
  isCollapsed: boolean;
}

const apps = [
  { id: 'cnp', name: 'Onboarding...', initials: 'CNP', color: 'bg-[#2DD4BF]' },
  { id: 'sop', name: 'SOP AI', initials: 'SOP', color: 'bg-[#F472B6]' },
  { id: 'ferti', name: 'Ferti AI', initials: 'SN', color: 'bg-[#2DD4BF]' },
  { id: 'pulse', name: 'Otto Pulse', initials: 'NPS', color: 'bg-[#F59E0B]' },
];

export const SwitchAppPopover = ({ isCollapsed }: SwitchAppPopoverProps) => {
  const handleAppClick = (appId: string) => {
    // Placeholder for app switching logic
    console.log(`Switching to app: ${appId}`);
  };

  const TriggerButton = (
    <button className={`
      w-full flex items-center ${isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'} 
      rounded-xl text-sm transition-all duration-200 group 
      text-muted-foreground hover:bg-muted hover:text-foreground font-medium
    `}>
      <div className={`
        flex items-center justify-center ${isCollapsed ? 'w-9 h-9' : ''} 
        rounded-xl transition-all duration-200 group-hover:scale-105
      `}>
        <LayoutGrid className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </div>
      {!isCollapsed && <span className="flex-1 text-left">Switch App</span>}
    </button>
  );

  const PopoverContentComponent = (
    <PopoverContent 
      side="right" 
      align="end"
      sideOffset={8}
      className="w-56 p-5 bg-white border border-border/50 shadow-xl rounded-2xl"
    >
      <div className="grid grid-cols-2 gap-3">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppClick(app.id)}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className={`
              w-14 h-14 rounded-full ${app.color} 
              flex items-center justify-center 
              text-white text-[11px] font-bold shadow-sm
            `}>
              {app.initials}
            </div>
            <span className="text-xs text-foreground/80 font-medium text-center truncate w-full">
              {app.name}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2 text-sm text-[#2DD4BF] font-medium">
          <LayoutGrid className="h-4 w-4" />
          <span>Switch App</span>
        </div>
      </div>
    </PopoverContent>
  );

  if (isCollapsed) {
    return (
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                {TriggerButton}
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card border-border text-foreground shadow-lg font-medium">
              <p>Switch App</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {PopoverContentComponent}
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {TriggerButton}
      </PopoverTrigger>
      {PopoverContentComponent}
    </Popover>
  );
};