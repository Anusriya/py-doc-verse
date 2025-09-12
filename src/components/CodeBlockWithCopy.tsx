import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface CodeBlockWithCopyProps {
  code: string;
  language?: string;
  className?: string;
}

// Ref interface for parent components to trigger copy
export interface CodeBlockRef {
  copyToClipboard: () => void;
}

const CodeBlockWithCopy = forwardRef<CodeBlockRef, CodeBlockWithCopyProps>(
  ({ code, language = 'python', className = '' }, ref) => {
    const [isCopied, setIsCopied] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Function to copy code to clipboard
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        if (textAreaRef.current) {
          textAreaRef.current.select();
          document.execCommand('copy');
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }
        console.error('Failed to copy code:', err);
      }
    };

    // Expose copyToClipboard to parent via ref
    useImperativeHandle(ref, () => ({
      copyToClipboard
    }));

    return (
      <div className={`relative ${className}`}>
        <div className="glass-card">
          {/* Header with language and copy button */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-glass-border/20">
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
              {language}
            </span>
            <Button
              onClick={copyToClipboard}
              variant="ghost"
              size="sm"
              className="glass-button h-8 px-3"
            >
              <motion.div
                initial={false}
                animate={{ 
                  scale: isCopied ? 1.1 : 1,
                  rotate: isCopied ? 10 : 0 
                }}
                transition={{ duration: 0.2 }}
              >
                {isCopied ? (
                  <CheckIcon className="h-4 w-4 text-accent" />
                ) : (
                  <ClipboardIcon className="h-4 w-4" />
                )}
              </motion.div>
              <span className="ml-2 text-sm">
                {isCopied ? 'Copied!' : 'Copy'}
              </span>
            </Button>
          </div>

          {/* Code content */}
          <div className="relative">
            <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
              <code className="text-foreground">
                {code}
              </code>
            </pre>
            
            {/* Hidden textarea for fallback copy */}
            <textarea
              ref={textAreaRef}
              value={code}
              readOnly
              className="absolute -left-9999px opacity-0"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>

          {/* Copy feedback animation */}
          {isCopied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium"
            >
              Code copied!
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);

CodeBlockWithCopy.displayName = 'CodeBlockWithCopy';

export default CodeBlockWithCopy;