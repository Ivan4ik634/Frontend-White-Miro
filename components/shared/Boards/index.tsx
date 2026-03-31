'use client';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useGetBoards } from '@/hooks/useGetBoards';
import '@/i18n';
import { useBoards } from '@/store/useBoards';
import { useFilters } from '@/store/useFilters';
import { BoardT } from '@/types/Board';
import { arrayFilters } from '@/utils/arrayFilters';
import { Loader, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BoardDialog } from '../BoardDialog';
import { Filters } from '../Filters';
import { BoardPreview } from './BoardPreview';
import { KanBan } from './Kanban';

interface Props {}

export const BoardsPage: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { filters } = useFilters();
  const { boards } = useBoards();
  const { isLoading } = useGetBoards();
  const userId = useAuth();

  if (isLoading)
    return (
      <div className="h-[calc(100vh-32px)] justify-center items-center flex w-full">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  const filtersData = arrayFilters(boards, userId, filters) as BoardT[];

  return (
    <div className="">
      <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start max-[500px]:justify-start">
        <div className="max-[500px]:mb-3">
          <h1 className="text-3xl font-bold">{t('title_boards')}</h1>
          <p className="opacity-50">{t('description_boards')}</p>
        </div>
        <BoardDialog type="add">
          <Button variant={'ghost'} className="flex items-center gap-x-2">
            <Plus />
            <p>{t('add_board')}</p>
          </Button>
        </BoardDialog>
      </div>
      <Filters />
      {filtersData.length !== 0 ? (
        <>
          <div className=" w-full max-[1200px]:hidden">
            <KanBan userId={userId} value={filtersData} />
          </div>
          <div className="hidden max-[1200px]:grid max-[1200px]:grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
            {filtersData.map((obj) => (
              <BoardPreview key={obj._id} userId={userId} type="grid" board={obj} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">{t('no_boards')}</p>
      )}
    </div>
  );
};
