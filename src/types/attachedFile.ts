export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number; // 0-100
  extractedText?: string;
  errorMessage?: string;
}
