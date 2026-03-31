'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { BoardT } from '@/types/Board';
import { useTranslation } from 'react-i18next';

interface Props {
  board: BoardT | undefined;
}

export const AccessWhoHas: React.FC<Props> = ({ board }) => {
  const {t} = useTranslation()
  return (
    <>
      <p className="font-bold text-xl">{t('who_has_access')}</p>
      <div className="flex flex-col gap-y-3">
        {board?.members.map((member) => (
          <div key={member._id} className="flex items-center gap-x-2">
            <div className="relative">
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.avatar} />
                <AvatarFallback>{member.username[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-bold">{member.username}</p>
              <p className="text-sm text-zinc-500">{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
