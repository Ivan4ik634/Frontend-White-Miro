import api from '@/lib/axios';
import { SettingsNotificationT } from '@/types/Settings';

export class SettingsService {
  async update(data: SettingsNotificationT): Promise<{ message: string }> {
    const res = await api.post('/settings/update', data);
    return res.data;
  }
}
export const settingsService = new SettingsService();
