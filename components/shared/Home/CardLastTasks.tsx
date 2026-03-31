import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { TaskT } from '@/types/Task';
import { useTranslation } from 'react-i18next';
import { TasksTable } from '../Tasks/Table';

interface Props {
  data: TaskT[];
}

export const CardLastTasks: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title_last_tasks')}</CardTitle>
        <CardDescription>{t('description_last_tasks')}</CardDescription>
      </CardHeader>
      <CardContent>
        <TasksTable data={data} />
      </CardContent>
    </Card>
  );
};
