import { ActivityT } from '@/types/Activity';
import dayjs from 'dayjs';
import { Edit2, Plus, Trash2, UserPlus } from 'lucide-react';

export const ActivityItem: React.FC<ActivityT> = ({ title, text, type, createdAt }) => {
  return (
    <div className="w-full p-2 duration-300 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 bg-zinc-200/40 dark:bg-zinc-800/40 rounded-[5px] flex gap-4 items-center max-[500px]:flex-col max-[500px]:items-start ">
      {type === 'create' ? (
        <div className="p-2 bg-green-500/70  rounded-[5px]">
          <Plus />
        </div>
      ) : type === 'edit' ? (
        <div className="p-2 bg-zinc-500/70  rounded-[5px]">
          <Edit2 />
        </div>
      ) : type === 'delete' ? (
        <div className="p-2 bg-red-500/70  rounded-[5px]">
          <Trash2 />
        </div>
      ) : (
        <div className="p-2 bg-green-500/70  rounded-[5px]">
          <UserPlus />
        </div>
      )}
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p>{text}</p>
        <p className="opacity-50 text-sm">{dayjs(createdAt).format('YYYY.MM.DD HH:mm')}</p>
      </div>
    </div>
  );
};
