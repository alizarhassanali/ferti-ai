import { Bold, Italic, List, Paperclip, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useDocumentOCR } from '@/hooks/useDocumentOCR';
import { FileProcessingItem } from './FileProcessingItem';

interface ContextTabProps {
  content: string;
  onContentChange: (content: string) => void;
  onLoadDemo?: () => void;
}

export const ContextTab = ({ content, onContentChange, onLoadDemo }: ContextTabProps) => {
  const { files, addFiles, removeFile, retryProcessing } = useDocumentOCR();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      addFiles(Array.from(droppedFiles));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      addFiles(Array.from(selectedFiles));
    }
    e.target.value = '';
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Toolbar */}
      <div className="flex items-center gap-1 mb-3 pb-3 border-b border-border">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        
        {onLoadDemo && (
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto gap-2"
            onClick={onLoadDemo}
          >
            <Wand2 className="h-4 w-4" />
            Load demo context
          </Button>
        )}
      </div>

      {/* Text Area */}
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Input any additional medical context you want included as part of your note."
        className="flex-1 min-h-[200px] resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base"
      />

      {/* Example hint */}
      <p className="text-sm text-muted-foreground mt-2">
        Ex: pt 35yoM, Hgb: 13.8, RBC: 4.5, WBC: 4,500
      </p>

      {/* File attachment area */}
      <div className="mt-4 pt-4 border-t border-border">
        <div
          className={cn(
            "border-2 border-dashed border-border rounded-lg p-4 text-center",
            "hover:border-primary/50 transition-colors cursor-pointer"
          )}
          onClick={() => document.getElementById('context-file-input')?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            id="context-file-input"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Paperclip className="h-4 w-4" />
            <span className="text-sm">Drag and drop files here or click to attach</span>
          </div>
        </div>

        {/* Files list with processing status */}
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map(file => (
              <FileProcessingItem
                key={file.id}
                file={file}
                onRemove={removeFile}
                onRetry={retryProcessing}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
