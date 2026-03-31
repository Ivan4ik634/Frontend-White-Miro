import { BoardT } from '@/types/Board';

export const KanBanColums = (value: BoardT[]) => {
  return [
    {
      boards: value.filter((obj) => obj.status === 'in planning'),
      status: 'in planning',
      title: 'In planning',
    },
    { boards: value.filter((obj) => obj.status === 'action'), status: 'action', title: 'Actions' },
    {
      boards: value.filter((obj) => obj.status === 'archived'),
      status: 'archived',
      title: 'Archived',
    },
    { boards: value.filter((obj) => obj.status === 'done'), status: 'done', title: 'Done' },
  ];
};
