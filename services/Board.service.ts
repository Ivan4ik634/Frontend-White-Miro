import api from '@/lib/axios';
import { BoardStatistickT, BoardT, CreateBoardT, UpdateBoardT } from '@/types/Board';
import { MessageT } from '@/types/Message';
import { TaskT } from '@/types/Task';

export class BoardService {
  async create(data: CreateBoardT): Promise<BoardT | { message: string }> {
    const res = await api.post('/board', data);
    return res.data;
  }
  async invite(id: string): Promise<{ message: string } | { error: string }> {
    const res = await api.post(`/board/invite/${id}`);
    return res.data;
  }
  async kick(id: string, data: { targetUserId: string }): Promise<{ message: string }> {
    const res = await api.post(`/board/kick/${id}`, data);
    return res.data;
  }
  async find(): Promise<BoardT[]> {
    const res = await api.get('/board');
    return res.data;
  }
  async findOne(
    id: string,
  ): Promise<
    | { board: BoardT; tasks: TaskT[]; messages: MessageT[] }
    | { message: 'Board not found' }
    | { message: 'Access denied' }
  > {
    const res = await api.get(`/board/${id}`);
    return res.data;
  }
  async statictick(): Promise<BoardStatistickT> {
    const res = await api.get(`/board/statistick`);
    return res.data;
  }
  async toggleLike(id: string): Promise<BoardT> {
    const res = await api.post(`/board/like/${id}`);
    return res.data;
  }

  async delete(id: string): Promise<{ message: string }> {
    const res = await api.delete(`/board/${id}`);
    return res.data;
  }
  async update(data: UpdateBoardT, id: string): Promise<BoardT | { message: string }> {
    const res = await api.patch(`/board/${id}`, data);
    return res.data;
  }
}
export const boardService = new BoardService();
