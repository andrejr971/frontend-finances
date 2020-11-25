import React, { useContext, createContext, useCallback } from 'react';

import { ThemeName } from '../styles/themes';

interface IThemeContextData {
  themeName: ThemeName;
  setThemeName(): void;
}

interface ThemeProviderProps {
  themeName: ThemeName;
  setTheme(theme: ThemeName): void;
}

const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData);

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  themeName,
  setTheme: setThemeName,
  children,
}) => {
  const setTheme = useCallback(() => {
    const theme = themeName === 'dark' ? 'light' : 'dark';

    localStorage.setItem('@finances:theme', theme);

    setThemeName(theme);
  }, [setThemeName, themeName]);

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setThemeName: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
