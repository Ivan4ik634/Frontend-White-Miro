import { UserT } from './User';

export interface MessageT {
  _id: string;
  text: string;
  roomId: string;
  userId: UserT;
  createdAt: Date;
}
