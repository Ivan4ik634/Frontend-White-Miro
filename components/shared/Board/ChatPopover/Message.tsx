import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { MessageT } from '@/types/Message';

interface Props {
  message: MessageT;
  userId: string;
}

export const Message: React.FC<Props> = ({ message, userId }) => {
  return (
    <div
      className={`flex w-full  gap-x-2 ${
        userId === message.userId._id && 'flex-row-reverse justify-end'
      }`}
    >
      <Avatar>
        <AvatarFallback>{message.userId.username[0]}</AvatarFallback>
        <AvatarImage src={message.userId.avatar} />
      </Avatar>
      <div className="rounded-[8px] w-[100%] px-3 py-2 bg-zinc-300 dark:bg-zinc-900 ">
        <p>{message.text}</p>
      </div>
    </div>
  );
};
