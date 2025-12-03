import { useState, useRef } from 'react';
import { Bold, Italic, List, Paperclip, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ContextTabProps {
  content: string;
  onContentChange: (content: string) => void;
}

interface AttachedFile {
  id: string;
  name: string;
  size: number;
}

export const ContextTab = ({ content, onContentChange }: ContextTabProps) => {
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: AttachedFile[] = Array.from(files).map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              const newFiles: AttachedFile[] = Array.from(files).map(file => ({
                id: crypto.randomUUID(),
                name: file.name,
                size: file.size,
              }));
              setAttachedFiles(prev => [...prev, ...newFiles]);
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Paperclip className="h-4 w-4" />
            <span className="text-sm">Drag and drop files here or click to attach</span>
          </div>
        </div>

        {/* Attached files list */}
        {attachedFiles.length > 0 && (
          <div className="mt-3 space-y-2">
            {attachedFiles.map(file => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 bg-muted rounded-md"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
