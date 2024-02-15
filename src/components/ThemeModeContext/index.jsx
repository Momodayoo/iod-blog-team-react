import React, { useState } from 'react';
import { getInitialTheme, setTheme } from '../../utils/theme';

const ThemeModeContext = React.createContext();

const ThemeModeProvider = ({ children }) => {
  const initialTheme = getInitialTheme();
  const [themeMode, setThemeMode] = useState(initialTheme);
  const toggleThemeMode = () => {
    console.log('toggleThemeMode');
    setTheme(themeMode === 'light' ? 'dark' : 'light');
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export { ThemeModeProvider, ThemeModeContext };
