import { UserT } from './User';

export interface CommentT {
  _id: string;
  userId: UserT;
  taskId: string;
  text: string;
  createdAt: string;
}
