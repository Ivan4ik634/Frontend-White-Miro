'use client';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n'; // вот так нужно

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const savedLang = localStorage.getItem('lang')?.slice(1, -1);
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  return <>{children}</>;
};
