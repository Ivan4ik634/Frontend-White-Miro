import { commentService } from '@/services/Comment.service';
import { taskService } from '@/services/Task.service';
import { useComments } from '@/store/useComments';
import { TaskT } from '@/types/Task';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useGetTask = () => {
  const param: { id: string } = useParams();
  const [task, setTask] = useState<TaskT>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<'Task not found' | 'Access denied' | null>(null);
  const { setComments, comments } = useComments();
  useEffect(() => {
    setLoading(true);
    Promise.all([taskService.findOne(param.id), commentService.findAll(param.id)]).then(
      ([resTask, resComments]) => {
        if ('message' in resTask) return setError(resTask.message);
        setTask(resTask);
        setComments(resComments);
      },
    );
    setLoading(false);
  }, []);
  return { task, error, comments, loading };
};
