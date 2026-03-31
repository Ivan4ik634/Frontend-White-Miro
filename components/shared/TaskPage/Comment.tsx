import { CommentT } from '@/types/Comment';
import dayjs from 'dayjs';

interface Props {
  comment: CommentT;
}

export const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-3">
      <p className="text-sm ">{comment.text}</p>
      <p className="text-xs opacity-50 mt-1">
        by <span className="font-medium">{comment.userId.username}</span> ·{' '}
        {dayjs(comment.createdAt).format('YYYY.MM.DD HH:mm')}
      </p>
    </div>
  );
};
