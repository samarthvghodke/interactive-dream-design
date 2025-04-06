
import React, { useState, useRef } from 'react';
import { Upload, Loader2, File, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface UploadAreaProps {
  className?: string;
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const UploadArea: React.FC<UploadAreaProps> = ({ className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file) return;
    
    // Check file type - assuming we want PDF files
    if (file.type !== 'application/pdf') {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF document",
      });
      return;
    }
    
    setFileName(file.name);
    setStatus('uploading');
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStatus('success');
          toast({
            title: "Upload complete",
            description: "Your contract has been successfully uploaded",
          });
        }, 500);
      }
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'uploading':
        return (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 text-fis-accent animate-spin" />
            <p className="text-sm text-muted-foreground">{fileName}</p>
            <div className="w-full max-w-xs h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-fis-accent"
                style={{ width: `${progress}%`, transition: 'width 0.2s ease-out' }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Uploading... {progress}%</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <CheckCircle className="h-10 w-10 text-green-500" />
            <p className="font-medium">Upload Successful!</p>
            <p className="text-sm text-muted-foreground">{fileName}</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setStatus('idle');
                setFileName(null);
              }}
            >
              Upload Another File
            </Button>
          </div>
        );
      
      case 'error':
        return (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <p className="font-medium">Upload Failed</p>
            <p className="text-sm text-muted-foreground">Please try again</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setStatus('idle');
                setFileName(null);
              }}
            >
              Try Again
            </Button>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-muted p-4 animate-float">
              <Upload className="h-8 w-8 text-fis-primary" />
            </div>
            <h3 className="text-lg font-semibold">Upload Contract</h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Drag and drop your contract file here, or click to browse
            </p>
            <Button 
              className="bg-fis-primary hover:bg-fis-secondary transition-colors" 
              onClick={handleButtonClick}
            >
              <Upload className="h-4 w-4 mr-2" /> Select File
            </Button>
            <p className="text-xs text-muted-foreground">Supported formats: PDF</p>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        'upload-area',
        isDragging && 'upload-area-active',
        status === 'uploading' && 'border-fis-accent',
        status === 'success' && 'border-green-400',
        status === 'error' && 'border-destructive',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {renderContent()}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf"
      />
    </div>
  );
};

export default UploadArea;
