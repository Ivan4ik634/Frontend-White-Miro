'use client';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const theme = localStorage.getItem('theme')?.slice(1, -1);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme ?? 'light');
  }, []);
  return <>{children}</>;
};
