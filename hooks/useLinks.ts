import { PAGES } from '@/config/pages';
import { LinkT } from '@/types/Link';
import { Activity, FolderOpen, Home, ListTodo, Puzzle, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const useLinks = (): LinkT[] => {
  const { t } = useTranslation();

  return [
    { name: t('home'), icon: Home, url: PAGES.dashboard },
    { name: t('tasks'), icon: ListTodo, url: PAGES.tasks },
    { name: t('boards'), icon: FolderOpen, url: PAGES.boards },
    { name: 'Templates', icon: Puzzle, url: PAGES.templates },
    { name: 'Activity', icon: Activity, url: PAGES.activity },
    { name: t('settings'), icon: Settings, url: PAGES.settings },
  ];
};
