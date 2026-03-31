import { taskService } from '@/services/Task.service';
import { TaskT } from '@/types/Task';
import { useEffect, useState } from 'react';

export const useGetTasks = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TaskT[]>([]);

  useEffect(() => {
    setLoading(true);
    taskService.find().then((res) => setData(res));
    setLoading(false);
  }, []);

  return { data, loading };
};
