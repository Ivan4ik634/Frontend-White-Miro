'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { useOnlineStatus } from '@/store/useOnlineStatus';
import { BoardT } from '@/types/Board';
import { Settings, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Share } from './Share';

interface Props {
  board: BoardT | undefined;
}

export const Header: React.FC<Props> = ({ board }) => {
  const { users } = useOnlineStatus();
  return (
    <div className="fixed z-11 backdrop-blur-md w-full top-0 left-0 px-3 py-2 h-[50px] flex items-center justify-between ">
      <Link href={PAGES.dashboard} className="font-bold text-2xl">
        White Miro
      </Link>
      <div className="flex items-center gap-x-3">
        <Link href={PAGES.boardSettings(board?._id ?? '')}>
          <Settings size={30} />
        </Link>
        <Share board={board}>
          <Share2 size={30}/>
        </Share>
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
          {board?.members.map((member) => (
            <div key={member._id} className="relative">
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.avatar} />
                <AvatarFallback>{member.username[0]}</AvatarFallback>
              </Avatar>
              {users.includes(member._id) ? (
                <div className="absolute bottom-0 right-0 p-1 z-10 bg-green-500 rounded-full" />
              ) : (
                <div className="absolute bottom-0 right-0 p-1 z-10 bg-zinc-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
