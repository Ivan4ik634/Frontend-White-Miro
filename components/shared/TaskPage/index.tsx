// app/task/[id]/page.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage, Button, Input } from '@/components/ui';
import { useCreateComment } from '@/hooks/useCreateComment';
import { useGetTask } from '@/hooks/useGetTask';
import { BoardT } from '@/types/Board';
import { UserT } from '@/types/User';
import dayjs from 'dayjs';
import { ArrowLeft, Loader, MessageCircle, Send } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Comment } from './Comment';

export function TaskPage() {
  // 🧠 Пример данных (пока нет бэкенда)
  const router = useRouter();
  const param: { id: string } = useParams();
  const { task, loading, error, comments } = useGetTask();
  const { handleAddComment, handleClickEnterSubmitForm, handleSetText, text } = useCreateComment(
    param.id,
  );
  if (loading || !task)
    return (
      <div className="absolute top-[50%] left-[50%] translate-[-50%]">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center gap-x-4 absolute top-[50%] left-[50%] translate-[-50%]">
        <h1 className="font-semibold text-2xl">404</h1>
        <p className="text-xl">Task not found</p>
      </div>
    );

  const avtor = task?.userId as UserT;
  const board = task?.boardId as BoardT;
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-6 min-h-screen ">
      <div className="flex w-full gap-x-[30px]">
        <ArrowLeft className="cursor-pointer" size={40} onClick={() => router.back()} />
        <div className="py-2 px-6">
          <div className="mb-4  flex items-center gap-x-2">
            <Avatar>
              <AvatarImage src={avtor.avatar} />
              <AvatarFallback>{avtor.username[0]}</AvatarFallback>
            </Avatar>
            <p>{avtor.username}</p>
          </div>
          <h1 className="text-4xl font-bold mb-2">{task?.title}</h1>
          <p className="opacity-50 text-2xl mb-4">{task?.text}</p>

          <div className="space-y-2  opacity-90">
            <p>
              <span className="font-semibold opacity-75">Board:</span> {board.title}
            </p>

            <p>
              <span className="font-semibold opacity-75">Status:</span>{' '}
              {task?.isDone ? (
                <span className="text-green-600 font-medium">Done</span>
              ) : (
                <span className="text-yellow-600 font-medium">In progress</span>
              )}
            </p>
            <p>
              <span className="font-semibold opacity-75">Created:</span>{' '}
              {dayjs(task?.createdAt).format('YYYY-MM-DD HH:mm')}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/3  rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Comments</h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {comments
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((c) => (
              <Comment key={c._id} comment={c} />
            ))}
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onKeyDown={handleClickEnterSubmitForm}
            onChange={handleSetText}
          />
          <Button onClick={handleAddComment}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
