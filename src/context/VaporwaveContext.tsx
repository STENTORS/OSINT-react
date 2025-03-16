import React, { createContext, useContext } from 'react';

interface VaporwaveContextType {
  // We'll keep this lightweight since we're no longer switching themes
  isVaporwave: boolean;
}

const VaporwaveContext = createContext<VaporwaveContextType>({
  isVaporwave: true,
});

export const useVaporwave = () => useContext(VaporwaveContext);

export const VaporwaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Apply vaporwave CSS classes to body
  React.useEffect(() => {
    document.body.classList.add('vaporwave-theme');
    
    return () => {
      document.body.classList.remove('vaporwave-theme');
    };
  }, []);

  return (
    <VaporwaveContext.Provider value={{ isVaporwave: true }}>
      {children}
    </VaporwaveContext.Provider>
  );
};
