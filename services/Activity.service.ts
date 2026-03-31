import api from '@/lib/axios';

export class ActivityService {
  async find(cursor: string | null | undefined) {
    const res = await api.get(`/activity?cursor=${cursor}`);
    return res.data;
  }
}
export const activityService = new ActivityService();
