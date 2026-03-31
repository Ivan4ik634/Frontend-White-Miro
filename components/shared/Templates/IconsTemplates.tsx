import { TypeBoardTemplateT } from '@/types/Board';
import { ArrowRightLeft, Bug, CirclePlay, GraduationCap, User, Users } from 'lucide-react';

export const IconsTemplates: React.FC<TypeBoardTemplateT> = ({ type }) => {
  return type === 'bugs' ? (
    <div className="p-2 dark:bg-zinc-500/70 bg-zinc-300/70 rounded-[5px]">
      <Bug />
    </div>
  ) : type === 'learning' ? (
    <div className="p-2 bg-yellow-500/70 rounded-[5px]">
      <GraduationCap />
    </div>
  ) : type === 'startup' ? (
    <div className="p-2 bg-green-500/70 rounded-[5px]">
      <CirclePlay />
    </div>
  ) : type === 'team' ? (
    <div className="p-2 dark:bg-zinc-500/70 bg-zinc-300/70 rounded-[5px]">
      <Users />
    </div>
  ) : type === 'personal' ? (
    <div className="p-2 dark:bg-zinc-500/70 bg-zinc-300/70 rounded-[5px]">
      <User />
    </div>
  ) : type === 'other' ? (
    <div className="p-2 dark:bg-zinc-800/70 bg-zinc-300/70 rounded-[5px]">
      <ArrowRightLeft />
    </div>
  ) : null;
};
