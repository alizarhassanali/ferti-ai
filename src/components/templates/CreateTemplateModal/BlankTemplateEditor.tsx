import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BlankTemplateEditorProps {
  onBack: () => void;
  onSave: () => void;
}

export const BlankTemplateEditor = ({ onBack, onSave }: BlankTemplateEditorProps) => {
  const [title, setTitle] = useState('Untitled template');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('Just me');
  const [type, setType] = useState('Note');
  const [isDefault, setIsDefault] = useState(false);
  const [helperOpen, setHelperOpen] = useState(true);

  return (
    <div className="flex h-[80vh] gap-6">
      {/* Left Side - Editor */}
      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="-ml-2 mb-4 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Create template &gt; Blank template
          </Button>
          
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-semibold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          
          <p className="text-sm text-muted-foreground mt-2">
            Add your template content here
          </p>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 resize-none font-mono text-sm"
          placeholder="Start typing your template content..."
        />

        <div className="flex items-center justify-between pt-6 border-t mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Visibility</Label>
              <Select value={visibility} onValueChange={setVisibility}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Just me">Just me</SelectItem>
                  <SelectItem value="My clinic">My clinic</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Note">Note</SelectItem>
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Letter">Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="default"
                checked={isDefault}
                onCheckedChange={setIsDefault}
              />
              <Label htmlFor="default" className="text-sm">Make default</Label>
            </div>

            <Button
              onClick={onSave}
              className="bg-[hsl(25,35%,25%)] hover:bg-[hsl(25,35%,20%)] text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Helper Panel */}
      {helperOpen && (
        <div className="w-80 flex flex-col gap-6 p-6 bg-muted/30 rounded-lg border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Helper</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHelperOpen(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2 text-foreground">Section headings</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Write headings & sections in <strong>plain text</strong> to reflect your personal note or document writing style.
              </p>
              <div className="p-3 bg-background border rounded-md">
                <code className="text-sm">e.g. Subjective</code>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-foreground">Placeholders</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Wrap text with [ ] to create areas FertiAI will try to fill in. For greater flexibility or optional content, use instructions instead.
              </p>
              <div className="p-3 bg-background border rounded-md">
                <code className="text-sm">[Mention patient's past medical history]</code>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-foreground">Verbatim</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Wrap text with " " to include terms word-for-word every time. This is helpful for things like note signatures and intros.
              </p>
              <div className="p-3 bg-background border rounded-md">
                <code className="text-sm">"P. Sherman, 42 Wallaby Way, Sydney."</code>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-foreground">Instructions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Wrap instructions in <strong>round brackets</strong> to indicate how FertiAI should treat information that is / is not mentioned in your session.
              </p>
              <div className="p-3 bg-background border rounded-md">
                <code className="text-sm text-wrap">
                  (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
                </code>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              If your template does not perform as expected, try adding AI instructions at the end of your template referencing the specific sections in your template and what you'd like to do to them.
            </p>
            <Button variant="link" className="h-auto p-0 text-xs">
              Go to help center
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      )}
      
      {!helperOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setHelperOpen(true)}
          className="self-start"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
