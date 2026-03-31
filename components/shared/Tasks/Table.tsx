import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { TaskT } from '@/types/Task';
import { textShorener } from '@/utils/textShortener';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface Props {
  data: TaskT[];
}

export const TasksTable: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return data.length !== 0 ? (
    <Table variant="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{t('text')}</TableHead>
          <TableHead>{t('avtor')}</TableHead>
          <TableHead>{t('board')}</TableHead>
          <TableHead className="text-right">{t('created_at')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((task, i) => (
          <TableRow key={task._id}>
            <TableCell className="font-medium">
              <Link href={PAGES.task(task._id)}>{textShorener(task.text, 35)}</Link>
            </TableCell>
            <TableCell>{typeof task.userId === 'string' ? '' : task.userId.username}</TableCell>
            <TableCell>
              <Link href={PAGES.board(typeof task.boardId === 'string' ? '' : task.boardId._id)}>
                {typeof task.boardId === 'string' ? '' : textShorener(task.boardId.title, 30)}
              </Link>
            </TableCell>
            <TableCell className="text-right">
              {dayjs(task.createdAt).format('YYYY.MM.DD')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p className="text-center">{t('no_tasks')}</p>
  );
};
