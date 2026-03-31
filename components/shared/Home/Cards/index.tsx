'use client';
import { BoardStatistickT } from '@/types/Board';
import { useTranslation } from 'react-i18next';
import { CardHome } from './CardHome';

interface Props {
  data: BoardStatistickT;
}

export const CardsHome: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-4 max-[900px]:grid-cols-3 max-[500px]:grid-cols-2 mt-5 gap-5 w-full">
      <CardHome description={t('total_boards')} title={String(data.totalBoards)} />
      <CardHome description={t('total_tasks')} title={String(data.totalTasks)} />
      <CardHome description={t('done_boards')} title={String(data.doneBoards)} />
      <CardHome description={t('private_boards')} title={String(data.privateBoards)} />
    </div>
  );
};
