import { Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { COLORS } from '@/data/colors';
import { useAuth } from '@/hooks/useAuth';
import { BoardT } from '@/types/Board';
import { textShorener } from '@/utils/textShortener';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import dayjs from 'dayjs';
import { GripVertical } from 'lucide-react';
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { Member } from './Member';
import { MenuBoard } from './MenuBoard';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  board: BoardT;
  type?: 'kanban' | 'grid';
  userId: string;
}

export const BoardPreview: React.FC<Props> = ({ type = 'grid', board, userId, ...props }) => {
  const avtor = board.members.find((obj) => obj._id === board.userId);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: board._id,
  });
  const { t } = useTranslation();
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div {...props} ref={setNodeRef} style={style} className="p-2 h-full rounded-[5px] ">
      {board.image ? (
        <div className="w-full relative">
          <Link href={PAGES.board(board._id)} className="cursor-pointer">
            <img src={board.image} alt="" className="w-full aspect-video rounded-[5px]" />
          </Link>
        </div>
      ) : (
        ''
      )}
      <Link href={PAGES.board(board._id)}>
        <div className="mb-3">
          <div className="flex flex-wrap gap-3 w-full ">
            {board.tags.map((tag) => {
              return (
                <Badge variant={'default'} className="p-2 opacity-50 rounded-[3px]">
                  <p className="font-semibold text-sm">{tag}</p>
                </Badge>
              );
            })}
          </div>
          <div className="mt-3">
            <p className="font-bold text-xl">{textShorener(board.title, 20)}</p>
            <p className="text-sm opacity-50">{textShorener(board.text, 140)}</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-end flex-col">
        <div className="flex items-center">
          <p className="font-bold">{t('avtor')}:</p>
          <div className="flex items-center ">
            <Avatar className="w-[25px] h-[25px]">
              <AvatarFallback>{avtor?.username[0]}</AvatarFallback>
              <AvatarImage src={avtor?.avatar} alt={avtor?.avatar} />
            </Avatar>
            <p className="mx-2">{textShorener(avtor?.username ?? '', 20)}</p>
          </div>
        </div>
        {board?.members.length > 1 && (
          <div className="mt-1 *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <p className="font-bold mr-3">{t('members')}:</p>
            {board?.members
              .reverse()
              .slice(0, 3)
              .map((member) => (
                <Member key={member._id} member={member} />
              ))}
            <p className="mx-5">
              {board.members.length > 3 ? `+ ${board.members.slice(0, 3).length}` : ''}
            </p>
          </div>
        )}

        <div className=" relative w-full  flex items-center justify-between">
          <p className="opacity-50">{dayjs(board.createdAt).format('YYYY.MM.DD')}</p>
          {type === 'kanban' && avtor?._id === userId ? (
            <div
              {...listeners}
              {...attributes}
              className="absolute  flex items-center gap-x-2 z-20 right-0 top-[50%] translate-[-50%]">
              <GripVertical className="cursor-grab" />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
