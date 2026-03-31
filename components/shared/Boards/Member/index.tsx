import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { UserT } from '@/types/User';

interface Props {
  member: UserT;
}

export const Member: React.FC<Props> = ({ member }) => {
  return (
      <Avatar className='w-[25px] h-[25px]'>
        <AvatarImage src={member.avatar} alt={member.avatar} />
        <AvatarFallback>{member.username[0]}</AvatarFallback>
      </Avatar>
  );
};
