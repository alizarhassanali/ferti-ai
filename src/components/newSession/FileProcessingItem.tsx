import { FileText, X, RotateCcw, AlertCircle, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { AttachedFile } from '@/types/attachedFile';

interface FileProcessingItemProps {
  file: AttachedFile;
  onRemove: (fileId: string) => void;
  onRetry?: (fileId: string) => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FileProcessingItem = ({ file, onRemove, onRetry }: FileProcessingItemProps) => {
  const isProcessing = file.status === 'uploading' || file.status === 'processing';
  const isComplete = file.status === 'complete';
  const isError = file.status === 'error';

  const getStatusText = () => {
    switch (file.status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing OCR...';
      case 'complete':
        return formatFileSize(file.size);
      case 'error':
        return file.errorMessage || 'Processing failed';
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-3 rounded-lg border transition-all",
        isComplete && "bg-muted/50 border-border",
        isProcessing && "bg-primary/5 border-primary/20",
        isError && "bg-destructive/5 border-destructive/20"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Status icon */}
          <div className="shrink-0">
            {isComplete && (
              <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
              </div>
            )}
            {isProcessing && (
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
            )}
            {isError && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
          </div>

          {/* File info */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className={cn(
              "text-xs",
              isError ? "text-destructive" : "text-muted-foreground"
            )}>
              {getStatusText()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {isError && onRetry && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => onRetry(file.id)}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onRemove(file.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress bar - only show during upload/processing */}
      {isProcessing && (
        <div className="space-y-1">
          <Progress value={file.progress} className="h-1.5" />
          <p className="text-[10px] text-muted-foreground text-right">
            {Math.round(file.progress)}%
          </p>
        </div>
      )}
    </div>
  );
};
