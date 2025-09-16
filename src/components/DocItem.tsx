import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import CodeBlockWithCopy, { CodeBlockRef } from '@/components/CodeBlockWithCopy';
import DownloadButton, { DownloadButtonRef } from '@/components/DownloadButton';

interface DocItemProps {
  title: string;
  description: string;
  code: string;
  packageName: string;
  fileName: string;
  secondaryCode?: string;
}

// Main component that demonstrates useRef pattern for controlling child components
const DocItem: React.FC<DocItemProps> = ({ 
  title, 
  description, 
  code, 
  packageName, 
  fileName,
  secondaryCode
}) => {
  // useRef hooks to control child components from parent
  const codeBlockRef = useRef<CodeBlockRef>(null);
  const downloadButtonRef = useRef<DownloadButtonRef>(null);

  // Parent functions that can trigger child actions via refs
  const handleQuickCopy = () => {
    if (codeBlockRef.current) {
      codeBlockRef.current.copyToClipboard();
    }
  };

  const handleQuickDownload = () => {
    if (downloadButtonRef.current) {
      downloadButtonRef.current.triggerDownload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>


      {/* Download Section */}
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4">Download Package</h3>
        <p className="text-muted-foreground mb-4">
          Get the pre-configured {packageName} package with examples and documentation.
        </p>
        
        {/* DownloadButton with ref for parent control */}
        <DownloadButton
          ref={downloadButtonRef}
          packageName={packageName}
          fileName={fileName}
        />
      </motion.div>

      {/* Code Section */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold">Sample Implementation</h3>
        
        {/* First Code Block */}
        <div className="space-y-2">
          <h4 className="text-md font-medium text-primary">How to install and run locally?</h4>
          <CodeBlockWithCopy
            ref={codeBlockRef}
            code={code}
            language="python"
          />
        </div>

        {/* Second Code Block */}
        <div className="space-y-2">
          <h4 className="text-md font-medium text-primary">How to import the library and run it in a python file?</h4>
          <CodeBlockWithCopy
            code={secondaryCode ?? code}
            language="python"
          />
        </div>
      </motion.div>

      {/* Usage Notes */}
      <motion.div 
        className="glass border-l-4 border-primary/30 p-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h4 className="font-semibold text-primary mb-2">💡 Implementation Notes</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Install the package: <code className="font-mono bg-muted/20 px-1 rounded">pip install {fileName}</code></li>
          <li>• Import the library and start with the sample code above</li>
          <li>• Check the included documentation for advanced usage</li>
          <li>• Modify parameters to suit your specific use case</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default DocItem;