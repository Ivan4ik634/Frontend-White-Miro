import api from '@/lib/axios';

export class UploadService {
  async uploadFile(formData: FormData): Promise<{ url: string }> {
    const res = await api.post('/upload/file', formData);
    return res.data;
  }
}
export const uploadService = new UploadService();
