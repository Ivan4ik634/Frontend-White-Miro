import { TaskT } from './Task';
import { UserT } from './User';

export interface BoardT {
  _id: string;

  title: string;
  text: string;
  tags: string[];

  image: string;

  userId: string;
  members: UserT[];

  access: 'locked' | 'public';
  status: string;

  tasksDone: number;
  tasks: number;

  liked: string[];
  createdAt: string;
}
export interface CreateBoardT {
  title: string;
  image: string;
  access?: 'locked' | 'public';
  status?: string;
  tags: string[];
  text: string;
}

export interface UpdateBoardT {
  image?: string;
  text?: string;
  tags?: string[];
  access?: 'locked' | 'public';
  status?: string;
  liked?: string[];
}
export interface BoardStatistickT {
  lastBoard: BoardT;
  lastBoards: BoardT[];
  lastTasks: TaskT[];
  totalBoards: number;
  totalTasks: number;
  teamBoards: number;
  privateBoards: number;
  avgMembers: number;
  doneBoards: number;
}
export interface TypeBoardTemplateT {
  type: 'team' | 'personal' | 'startup' | 'learning' | 'bugs' | 'other';
}
export interface BoardTemplateT extends TypeBoardTemplateT {
  title: string;
  text: string;
  tags:string[]
}
