import api from '@/lib/axios';
import { ScheduleTasksT } from '@/types/Task';

class ScheduleService {
  async tasks(): Promise<ScheduleTasksT[]> {
    const res = await api.get('/schedule/tasks');
    return res.data;
  }
}
export const scheduleService = new ScheduleService();
