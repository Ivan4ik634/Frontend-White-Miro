import { boardService } from '@/services/Board.service';
import { useMessages } from '@/store/useMessages';
import { usePositionUsers } from '@/store/usePositionUsers';
import { useTasks } from '@/store/useTasks';
import { BoardT } from '@/types/Board';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useGetBoard = () => {
  const param: { id: string } = useParams();
  const { setTasks } = useTasks();
  const { setPositionUsers } = usePositionUsers();
  const { setMessages } = useMessages();
  const { data, isLoading } = useQuery({
    queryKey: ['board', param.id],
    queryFn: () => boardService.findOne(param.id),
    enabled: !!param.id,
  });
  const [board, setBoard] = useState<BoardT>();
  const [error, setError] = useState<'Access denied' | 'Board not found' | null>(null);
  useEffect(() => {
    if (!data) return;
    if (data.board.message && data.board.message === 'Board not found') return;
    if (data.board && data.board._id !== param.id) return;
    if ('message' in data) return setError(data.message);
    setTasks({ tasks: data.tasks, boardId: param.id });
    setBoard(data.board);
    setPositionUsers(data.board.members.map((user) => ({ user: user, x: 0, y: 0 })));
    setMessages(data.messages);
  }, [data, param.id]);
  return { board, error, setBoard, isLoading };
};
