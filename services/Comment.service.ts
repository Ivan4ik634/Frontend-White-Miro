import api from '@/lib/axios';
import { CommentT } from '@/types/Comment';

export class CommentService {
  async findAll(id: string): Promise<CommentT[]> {
    const res = await api.get(`/comment/${id}`);
    return res.data;
  }
  async create(data: { text: string; taskId: string }): Promise<CommentT> {
    const res = await api.post(`/comment`, data);
    return res.data;
  }
  async update(data: { text: string; commentId: string }): Promise<CommentT> {
    const res = await api.patch(`/comment`, data);
    return res.data;
  }
  async delete(id: string):Promise<{message:string}> {
    const res = await api.delete(`/comment/${id}`);
    return res.data;
  }
}
export const commentService = new CommentService();
