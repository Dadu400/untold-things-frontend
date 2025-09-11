import { createContext, useContext, ReactNode } from 'react';
import { usePWAInstall } from './usePWAInstaller';

type PWAInstallContextValue = ReturnType<typeof usePWAInstall>;

const PWAInstallContext = createContext<PWAInstallContextValue | null>(null);

export const PWAInstallProvider = ({ children }: { children: ReactNode }) => {
  const value = usePWAInstall();
  return <PWAInstallContext.Provider value={value}>{children}</PWAInstallContext.Provider>;
};

export const usePWAInstallContext = () => {
  const ctx = useContext(PWAInstallContext);
  if (!ctx) {
    throw new Error('usePWAInstallContext must be used within a PWAInstallProvider');
  }
  return ctx;
};


