import { BoardT } from '@/types/Board';
import { useDroppable } from '@dnd-kit/core';
import { BoardPreview } from '../BoardPreview';
interface Props {
  title: string;
  boards: BoardT[];
  userId: string;
  i: string;
}

export const KanBanColumn: React.FC<Props> = ({ boards, userId, i, title }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: i,
  });
  const style = {
    opacity: isOver ? 1 : 0.9,
  };
  return (
    <div ref={setNodeRef} className="w-full px-2 py-1" style={style}>
      <p className="font-bold text-xl">
        {title} | {boards.length}
      </p>
      <div className="flex min-h-[650px] flex-col p-3 border shadow-md border-zinc-200 dark:border-zinc-800 rounded-[8px] mt-3 gap-y-7">
        {boards.map((board) => (
          <BoardPreview userId={userId} key={board._id} type="kanban" board={board} />
        ))}
      </div>
    </div>
  );
};
