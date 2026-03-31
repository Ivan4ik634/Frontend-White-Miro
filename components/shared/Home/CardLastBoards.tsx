import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PAGES } from '@/config/pages';
import { BoardT } from '@/types/Board';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface Props {
  data: BoardT[];
}

export const CardLastBoards: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title_last_boards')}</CardTitle>
        <CardDescription>{t('description_last_boards')}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length !== 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{t('title')}</TableHead>
                <TableHead>{t('avtor')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('access')}</TableHead>
                <TableHead className="text-right">{t('created_at')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((board) => {
                const avtor = board.members.find((obj) => obj._id === board.userId);
                return (
                  <TableRow className="w-full">
                    <TableCell className="font-medium">
                      <Link href={PAGES.board(board._id)}>{board.text}</Link>
                    </TableCell>
                    <TableCell className="flex gap-x-2 items-center">{avtor?.username}</TableCell>
                    <TableCell>{board.status}</TableCell>
                    <TableCell>{board.access}</TableCell>
                    <TableCell className="text-right">
                      {dayjs(board.createdAt).format('YYYY.MM.DD')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center">{t('no_boards')}</p>
        )}
      </CardContent>
    </Card>
  );
};
