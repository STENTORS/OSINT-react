
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';

interface AnimatedTerminalProps {
  isSearching: boolean;
  searchParams?: any;
}

const AnimatedTerminal = ({ isSearching, searchParams }: AnimatedTerminalProps) => {
  const { theme } = useTheme();
  const [lines, setLines] = useState<string[]>([
    "[root@hackershell:~]# ./osint_init.sh",
    "[root@hackershell:~]# OSINT tool initialized...",
    "[root@hackershell:~]# Awaiting target parameters..."
  ]);
  
  useEffect(() => {
    if (isSearching && searchParams) {
      const newLines = [
        `[root@hackershell:~]# TARGET ACQUIRED: ${searchParams.email || 'No email provided'}`,
        "[root@hackershell:~]# Establishing connection to darknet...",
        "[root@hackershell:~]# Scanning breach databases...",
        "[root@hackershell:~]# Bypassing security protocols...",
        "[root@hackershell:~]# Data mining in progress <|=======>",
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
      setLines(prev => [...prev, "[root@hackershell:~]# Operation complete. Target data extracted."]);
    }
  }, [isSearching, searchParams]);

  // Matrix background effect
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@*&^%!".split("");
  const matrixCharacters = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
    x: Math.random() * 100,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2
  }));
  
  // Theme-specific colors
  const getThemeColors = () => {
    switch (theme) {
      case 'cyber':
        return {
          text: 'text-cyber-blue',
          bg: 'bg-cyber-blue-dark',
          border: 'border-cyber-blue/30',
          highlight: 'text-cyber-blue'
        };
      case 'glitch':
        return {
          text: 'text-glitch-primary',
          bg: 'bg-glitch-dark',
          border: 'border-glitch-primary/30',
          highlight: 'text-glitch-primary'
        };
      case 'retro':
        return {
          text: 'text-retro-brightGreen',
          bg: 'bg-retro-darkBlue',
          border: 'border-retro-brightGreen/30',
          highlight: 'text-retro-brightGreen'
        };
      default: // hacker
        return {
          text: 'text-hacker',
          bg: 'bg-hacker-dark',
          border: 'border-hacker/30',
          highlight: 'text-hacker'
        };
    }
  };
  
  const colors = getThemeColors();

  return (
    <div className={`terminal-container relative h-[256px] overflow-hidden border-${colors.border}`}>
      <div className={`terminal-header ${colors.bg} px-2 py-1 flex items-center`}>
        <span className={`text-xs ${colors.text} font-mono`}>root@hackershell:~ | breach_hunter v1.0</span>
        <div className="ml-auto flex items-center gap-1">
          <span className={`text-xs ${colors.text}`}>_</span>
          <span className={`text-xs ${colors.text}`}>□</span>
          <span className={`text-xs ${colors.text}`}>✕</span>
        </div>
      </div>
      
      {/* Matrix background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {matrixCharacters.map((char) => (
          <div 
            key={char.id}
            className="matrix-character"
            style={{
              left: `${char.x}%`,
              animationDuration: `${char.duration}s`,
              animationDelay: `${char.delay}s`
            }}
          >
            {char.char}
          </div>
        ))}
      </div>
      
      <div className="h-[220px] overflow-y-auto pr-2 relative z-10 p-2">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-xs md:text-sm mb-1.5 ${colors.text}`}
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
            <span className={`text-xs md:text-sm ${colors.text}`}>[root@hackershell:~]# </span>
            <span className={`ml-1 h-3 w-3 animate-pulse`} style={{ backgroundColor: 'currentColor' }}></span>
          </motion.div>
        )}
      </div>
      
      <div className="absolute inset-0 pointer-events-none scanline opacity-20"></div>
    </div>
  );
};

export default AnimatedTerminal;
