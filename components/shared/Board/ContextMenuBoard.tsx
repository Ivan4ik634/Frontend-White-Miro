import { ContextMenuContent, ContextMenuDiv } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { boardService } from '@/services/Board.service';
import { useBoards } from '@/store/useBoards';
import { BoardT } from '@/types/Board';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Socket } from 'socket.io-client';
import { BoardDialog } from '../BoardDialog';
import { TaskDialog } from '../Task/TaskDialog';

interface Props {
  type?: 'not-add' | 'all';
  scale: number;
  position: { x: number; y: number };
  socket?: Socket;
  board: BoardT;
}

export const ContextMenuBoard: React.FC<Props> = ({
  socket,
  type = 'all',
  board,
  scale,
  position,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { toggleBoardLike } = useBoards();
  const [event, setEvent] = useState<MouseEvent | null>(null);
  const userId = useAuth();

  const handleAddToFavorite = async () => {
    toggleBoardLike(board._id, userId);
    await boardService.toggleLike(board._id);
  };
  return (
    <ContextMenuContent className="flex flex-col" onClick={(e) => setEvent(e)}>
      {type === 'all' ? (
        <TaskDialog
          socket={socket!}
          position={position}
          scale={scale}
          event={event!}
          type="add"
          boardId={board._id}
        >
          <ContextMenuDiv>{t('add_task')}</ContextMenuDiv>
        </TaskDialog>
      ) : (
        <ContextMenuDiv onClick={() => handleAddToFavorite()} className="flex gap-x-2 items-center">
          <Heart fill={board.liked.includes(userId) ? 'red' : 'white'} color="red" />
          <p>{board.liked.includes(userId) ? t('remove_to_favorite') : t('add_to_favorite')}</p>
        </ContextMenuDiv>
      )}
      {board.userId === userId && (
        <>
          <BoardDialog type="edit" board={board}>
            <ContextMenuDiv>{t('edit_board')}</ContextMenuDiv>
          </BoardDialog>
        </>
      )}
    </ContextMenuContent>
  );
};
