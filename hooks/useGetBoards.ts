import { boardService } from '@/services/Board.service';
import { useBoards } from '@/store/useBoards';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetBoards = () => {
  const { setBoards } = useBoards();
  const { data, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: boardService.find,
  });
  useEffect(() => {
    if (data) setBoards(data);
  }, [data]);
  return { isLoading };
};
