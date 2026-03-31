import { BoardT } from './Board';
import { UserT } from './User';
export interface TaskT {
  _id: string;
  title: string;
  text: string;
  boardId: string | BoardT;
  userId: string | UserT;
  isDone: boolean;
  edges: { from: string; to: string }[];
  x: number;
  y: number;
  createdAt: string;
}
export interface CreateTaskT {
  text: string;
  x: number;
  y: number;
  boardId: string;
}
export interface UpdateTaskT {
  title?: string;
  text?: string;

  x?: number;
  y?: number;
  edge?: { from: string; to: string };

  isDone?: boolean;
}
export interface ScheduleTasksT {
  _id: string;
  tasksDone: number;
  userId: string;
  createdAt: string;
}
