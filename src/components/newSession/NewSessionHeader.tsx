import { Button } from '@/components/ui/button';
import { Plus, Settings, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
interface NewSessionHeaderProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  onNewSession: () => void;
}
const templates = ['SOAP Note (Standard)', 'My Dictation', 'My Consult Letter', 'Progress Note', 'H&P', 'Procedure Note', 'Custom Template...'];
export const NewSessionHeader = ({
  selectedTemplate,
  onTemplateChange,
  onNewSession
}: NewSessionHeaderProps) => {
  return <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">
        {/* Template Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {selectedTemplate}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {templates.map(template => <DropdownMenuItem key={template} onClick={() => onTemplateChange(template)}>
                {template}
              </DropdownMenuItem>)}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Template Button */}
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Right Section */}
      
    </div>;
};