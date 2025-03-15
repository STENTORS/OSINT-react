
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

interface AnimatedTerminalProps {
  isSearching: boolean;
  searchParams?: any;
}

const AnimatedTerminal = ({ isSearching, searchParams }: AnimatedTerminalProps) => {
  const [lines, setLines] = useState<string[]>([
    "$ OSINT tool initialized...",
    "$ Ready for search parameters..."
  ]);
  
  useEffect(() => {
    if (isSearching && searchParams) {
      const newLines = [
        `$ Starting search for: ${searchParams.email || 'No email provided'}`,
        "$ Connecting to database...",
        "$ Running breach check...",
        "$ Processing results..."
      ];
      
      let timeoutId: NodeJS.Timeout;
      let currentIndex = 0;
      
      const addLine = () => {
        if (currentIndex < newLines.length) {
          setLines(prev => [...prev, newLines[currentIndex]]);
          currentIndex++;
          timeoutId = setTimeout(addLine, 1000);
        }
      };
      
      timeoutId = setTimeout(addLine, 500);
      
      return () => clearTimeout(timeoutId);
    } else if (!isSearching && searchParams) {
      setLines(prev => [...prev, "$ Search complete. Results ready."]);
    }
  }, [isSearching, searchParams]);

  return (
    <div className="terminal-container relative h-[256px] overflow-hidden">
      <div className="terminal-header">
        <div className="terminal-circle bg-red-400"></div>
        <div className="terminal-circle bg-amber-400"></div>
        <div className="terminal-circle bg-green-400"></div>
        <span className="text-xs text-muted-foreground ml-2">terminal</span>
      </div>
      
      <div className="h-[220px] overflow-y-auto pr-2">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs md:text-sm mb-1.5"
          >
            {line}
          </motion.div>
        ))}
        
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <span className="text-xs md:text-sm">$ </span>
            <span className="ml-1 h-3 w-3 bg-primary animate-pulse"></span>
          </motion.div>
        )}
      </div>
      
      <div className="absolute inset-0 pointer-events-none border-t border-border/50 animate-scan-line opacity-10"></div>
    </div>
  );
};

export default AnimatedTerminal;
