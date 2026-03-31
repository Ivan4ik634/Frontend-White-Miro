import api from '@/lib/axios';
import { TaskT } from '@/types/Task';

export class TaskService {
  async find(): Promise<TaskT[]> {
    const res = await api.get(`/task`);
    return res.data;
  }
  async findOne(
    id: string,
  ): Promise<TaskT | { message: 'Task not found' } | { message: 'Access denied' }> {
    const res = await api.get(`/task/${id}`);
    return res.data;
  }
}
export const taskService = new TaskService();
