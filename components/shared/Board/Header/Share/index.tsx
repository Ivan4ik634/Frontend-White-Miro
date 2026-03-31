'use client';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useCopyText } from '@/hooks/useCopyText';
import { BoardT } from '@/types/Board';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { AccessWhoHas } from './AccessWhoHas';
import { StatusAccess } from './StatusAccess';

interface Props {
  board: BoardT | undefined;
  children: React.ReactNode;
}

export const Share: React.FC<Props> = ({ board, children }) => {
  const param: { id: string } = useParams();
  const { t } = useTranslation();
  const { copyText } = useCopyText(window.location.origin + `/app/board/${param.id}/invite`);
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t('share_board')}</DialogTitle>
        <div className="space-y-3 flex flex-col">
          <AccessWhoHas board={board} />
          <StatusAccess status={board?.access ?? 'locked'} />

          <DialogFooter className="flex mt-3 max-[900px]:w-full items-center gap-x-4">
            <Button variant={'outline'} className="max-[900px]:w-full" onClick={copyText}>
              {t('copy_link')}
            </Button>
            <DialogClose asChild>
              <Button className="max-[900px]:w-full">{t('submit')}</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
