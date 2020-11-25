import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import AppProvider from './hooks';

import GlobalStyles from './styles/GlobalStyles';
import { ThemeName, themes } from './styles/themes';

const App: React.FC = () => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const themeLocal = localStorage.getItem('@finances:theme');

    if (!themeLocal) {
      return 'dark';
    }

    return themeLocal === 'dark' ? 'dark' : 'light';
  });

  const currentTheme = themes[themeName];

  return (
    <ThemeProvider theme={currentTheme}>
      <AppProvider setTheme={setThemeName} themeName={themeName}>
        <BrowserRouter>
          <Routes />
          <GlobalStyles />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
