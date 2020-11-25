import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeProvider } from './theme';
import { ThemeName } from '../styles/themes';
import { DashboardProvider } from './dashboard';
import { TransactionProvider } from './transactions';

interface AppProviderProps {
  themeName: ThemeName;
  setTheme(theme: ThemeName): void;
}

const AppProvider: React.FC<AppProviderProps> = ({
  setTheme,
  themeName,
  children,
}) => {
  return (
    <ThemeProvider setTheme={setTheme} themeName={themeName}>
      <ToastProvider>
        <AuthProvider>
          <DashboardProvider>
            <TransactionProvider>{children}</TransactionProvider>
          </DashboardProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
