'use client';
import { useGetBoard } from '@/hooks/useGetBoard';
import { Loader } from 'lucide-react';
import { BoardSettingsContent } from './BoardSettingsContent';
import { BoardSettingsDanger } from './BoardSettingsDanger';
import { BoardSettingsKeys } from './BoardSettingsKeys';
import { BoardSettingsMembers } from './BoardSettingsMembers';

interface Props {}

export const BoardSettings: React.FC<Props> = (props) => {
  const { board, error, isLoading } = useGetBoard();

  if (error)
    return (
      <div className="flex items-center gap-x-4 h-[calc(100vh-32px)] justify-center w-full">
        <h1 className="font-semibold text-2xl">404</h1>
        <p className="text-xl">Settings board not found</p>
      </div>
    );
  if (isLoading || !board)
    return (
      <div className="h-[calc(100vh-32px)] justify-center items-center flex w-full">
        <Loader className="animate-spin" size={40} />
      </div>
    );

  return (
    <div className="gap-y-3 flex flex-col w-full">
      <BoardSettingsContent board={board} />
      <BoardSettingsMembers board={board} />
      <BoardSettingsKeys board={board} />
      <BoardSettingsDanger board={board} />
    </div>
  );
};
