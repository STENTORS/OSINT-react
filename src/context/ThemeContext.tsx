
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'hacker' | 'cyber' | 'glitch' | 'retro';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'hacker',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('hacker');

  // Apply theme-specific CSS classes to body
  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove('theme-hacker', 'theme-cyber', 'theme-glitch', 'theme-retro');
    // Add current theme class
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
