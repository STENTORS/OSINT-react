
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Palette, Code, Skull, Terminal } from 'lucide-react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        size="sm"
        variant={theme === 'hacker' ? 'default' : 'outline'}
        className={`${theme === 'hacker' ? 'bg-hacker text-black' : 'border-hacker/50 text-hacker'}`}
        onClick={() => setTheme('hacker')}
      >
        <Terminal className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Hacker</span>
      </Button>
      
      <Button
        size="sm"
        variant={theme === 'cyber' ? 'default' : 'outline'}
        className={`${theme === 'cyber' ? 'bg-cyber-blue text-black' : 'border-cyber-blue/50 text-cyber-blue'}`}
        onClick={() => setTheme('cyber')}
      >
        <Code className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Cyber</span>
      </Button>
      
      <Button
        size="sm"
        variant={theme === 'glitch' ? 'default' : 'outline'}
        className={`${theme === 'glitch' ? 'bg-glitch-primary text-black' : 'border-glitch-primary/50 text-glitch-primary'}`}
        onClick={() => setTheme('glitch')}
      >
        <Skull className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Glitch</span>
      </Button>
      
      <Button
        size="sm"
        variant={theme === 'retro' ? 'default' : 'outline'}
        className={`${theme === 'retro' ? 'bg-retro-brightGreen text-black' : 'border-retro-brightGreen/50 text-retro-brightGreen'}`}
        onClick={() => setTheme('retro')}
      >
        <Palette className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Retro</span>
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
