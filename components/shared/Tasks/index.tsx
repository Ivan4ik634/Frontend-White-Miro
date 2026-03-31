'use client';
import { useAuth } from '@/hooks/useAuth';
import { useGetTasks } from '@/hooks/useGetTasks';
import '@/i18n';
import { useFilters } from '@/store/useFilters';
import { TaskT } from '@/types/Task';
import { arrayFilters } from '@/utils/arrayFilters';
import { Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Filters } from '../Filters';
import { TasksTable } from './Table';

interface Props {}

export const TasksPage: React.FC<Props> = (props) => {
  const { filters } = useFilters();
  const { data, loading } = useGetTasks();

  const { t } = useTranslation();
  const userId = useAuth();

  if (loading)
    return (
      <div className="h-[calc(100vh-32px)] justify-center items-center flex w-full">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  const filtersData = arrayFilters(data, userId, filters) as TaskT[];

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">{t('tasks')}</h1>
        <p className="opacity-50">{t('description_tasks')}</p>
      </div>
      <Filters type="not-filters" />
      <TasksTable data={filtersData} />
    </div>
  );
};
