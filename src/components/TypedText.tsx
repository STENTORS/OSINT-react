
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface TypedTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypedText = ({ text, className, delay = 500, speed = 50 }: TypedTextProps) => {
  const { theme } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Theme-specific classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'cyber':
        return {
          text: 'text-cyber-blue',
          light: 'text-cyber-blue/70',
          cursor: 'typed-cursor-cyber bg-cyber-blue'
        };
      case 'glitch':
        return {
          text: 'text-glitch-primary',
          light: 'text-glitch-primary/70',
          cursor: 'typed-cursor-glitch bg-glitch-primary'
        };
      case 'retro':
        return {
          text: 'text-retro-brightGreen',
          light: 'text-retro-brightGreen/70',
          cursor: 'typed-cursor-retro bg-retro-brightGreen'
        };
      default: // hacker
        return {
          text: 'text-hacker',
          light: 'text-hacker-light',
          cursor: 'typed-cursor bg-hacker'
        };
    }
  };
  
  const themeClasses = getThemeClasses();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Initial delay before typing starts
    timeout = setTimeout(() => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <div className={cn("inline-flex font-mono", themeClasses.text, className)}>
      <span className={themeClasses.light}>[</span><span className={themeClasses.text}>$</span><span className={themeClasses.light}>]</span> {displayText}
      {isTyping && <span className={themeClasses.cursor}></span>}
    </div>
  );
};

export default TypedText;
