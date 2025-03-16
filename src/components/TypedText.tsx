
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypedTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypedText = ({ text, className, delay = 500, speed = 50 }: TypedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

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
    <div className={cn("inline-flex font-mono", "text-gradient-pink", className)}>
      <span className="text-neon-teal">[</span><span className="text-neon-purple">$</span><span className="text-neon-teal">]</span> {displayText}
      {isTyping && <span className="typed-cursor bg-neon-purple"></span>}
    </div>
  );
};

export default TypedText;
