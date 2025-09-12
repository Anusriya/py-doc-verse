import React, { useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface DownloadButtonProps {
  packageName: string;
  fileName: string;
  className?: string;
}

// Ref interface for parent components to trigger download
export interface DownloadButtonRef {
  triggerDownload: () => void;
}

const DownloadButton = forwardRef<DownloadButtonRef, DownloadButtonProps>(
  ({ packageName, fileName, className = '' }, ref) => {
    
    // Function to trigger file download
    const triggerDownload = () => {
      try {
        // Create download link for file in public folder
        const link = document.createElement('a');
        link.href = `/packages/${fileName}`;
        link.download = fileName;
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log(`Downloading package: ${packageName}`);
      } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed. Please try again.');
      }
    };

    // Expose triggerDownload to parent via ref
    useImperativeHandle(ref, () => ({
      triggerDownload
    }));

    return (
      <div className={className}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={triggerDownload}
            className="gradient-primary text-primary-foreground font-medium glass-button group"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowDownTrayIcon className="h-5 w-5 group-hover:animate-bounce" />
              <span>Download {packageName}</span>
            </motion.div>
          </Button>
        </motion.div>
      </div>
    );
  }
);

DownloadButton.displayName = 'DownloadButton';

export default DownloadButton;