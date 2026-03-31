export interface ActivityT {
  _id: string;

  title: string;
  text: string;
  type: 'create' | 'edit' | 'delete' | 'invite';

  members: string[];
  boardId: string;

  createdAt: string;
}
