import { FileText, X, RotateCcw, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AttachedFile } from '@/types/attachedFile';

interface FileProcessingItemProps {
  file: AttachedFile;
  onRemove: (fileId: string) => void;
  onRetry?: (fileId: string) => void;
}

export const FileProcessingItem = ({ file, onRemove, onRetry }: FileProcessingItemProps) => {
  const isProcessing = file.status === 'uploading' || file.status === 'processing';
  const isError = file.status === 'error';

  return (
    <div
      title={file.name}
      className={cn(
        "relative flex flex-col items-center gap-1 p-2 rounded-lg border w-[130px] min-w-[130px] transition-all",
        isError ? "border-destructive/40 bg-destructive/5" : "border-border bg-muted/50",
        isProcessing && "border-primary/30 bg-primary/5"
      )}
    >
      {/* Remove button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute -top-1.5 -right-1.5 h-5 w-5 p-0 rounded-full bg-muted border border-border hover:bg-destructive/10"
        onClick={() => onRemove(file.id)}
      >
        <X className="h-3 w-3" />
      </Button>

      {/* Icon area */}
      <div className="relative h-8 w-8 flex items-center justify-center">
        {isProcessing ? (
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
        ) : isError ? (
          <AlertCircle className="h-5 w-5 text-destructive" />
        ) : (
          <FileText className="h-5 w-5 text-muted-foreground" />
        )}
      </div>

      {/* Truncated filename */}
      <span className="text-xs text-foreground truncate w-full text-center leading-tight">
        {file.name}
      </span>

      {/* Error retry */}
      {isError && onRetry && (
        <button
          className="text-[10px] text-destructive hover:underline flex items-center gap-0.5"
          onClick={() => onRetry(file.id)}
        >
          <RotateCcw className="h-2.5 w-2.5" />
          Retry
        </button>
      )}
    </div>
  );
};
