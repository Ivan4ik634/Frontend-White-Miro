import { KanBanColums } from '@/data/kanbanColums';
import { boardService } from '@/services/Board.service';
import { useBoards } from '@/store/useBoards';
import { BoardT } from '@/types/Board';
import { DndContext } from '@dnd-kit/core';
import { KanBanColumn } from './KanBanColumn';

interface Props {
  value: BoardT[];
  userId: string;
}

export const KanBan: React.FC<Props> = ({ value, userId }) => {
  const { editBoard } = useBoards();
  return (
    <div className="grid mt-5  grid-cols-4 gap-4">
      <DndContext
        onDragEnd={async (event) => {
          const { active, over } = event;
          if (!over) return;

          const newStatus = over.id;
          editBoard(String(active.id), { status: String(newStatus) });
          await boardService.update({ status: String(newStatus) }, String(active.id));
        }}
      >
        {KanBanColums(value)!.map(({ boards, title, status }) => (
          <KanBanColumn userId={userId} i={status} boards={boards} key={status} title={title} />
        ))}
      </DndContext>
    </div>
  );
};
