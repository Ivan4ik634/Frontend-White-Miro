'use client';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea,
} from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/store/useTasks';
import { TaskT } from '@/types/Task';
import { useParams } from 'next/navigation';
import { MouseEvent, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Socket } from 'socket.io-client';

interface Props {
  type: 'add' | 'edit';
  boardId?: string;
  task?: TaskT;
  children: ReactNode;
  socket: Socket;
  event?: MouseEvent;
  position?: { x: number; y: number };
  scale?: number;
}

export const TaskDialog: React.FC<Props> = ({
  type,
  event,
  task,
  socket,
  boardId,
  position,
  scale = 1,
  children,
}) => {
  const { t } = useTranslation();
  const param: { id: string } = useParams();
  const titleDialog = t(type === 'add' ? 'add_task' : 'edit_task');

  const { editTask } = useTasks();
  const [text, setText] = useState(task ? task.text : '');
  const [title, setTitle] = useState(task ? task.title : '');
  const [loading, setLoading] = useState(false);
  const userId = useAuth();
  const onSubmit = async () => {
    if (type === 'add') {
      const x = (event!.clientX - position!.x) / scale;
      const y = (event!.clientY - position!.y) / scale;
      socket?.emit('task:create', {
        text,
        title,
        userId,
        boardId: boardId!,
        x,
        y,
        roomId: param.id,
      });
    } else {
      editTask(task!._id!, { text, title });
      socket?.emit('task:update', { text, title, userId, _id: task!._id!, roomId: param.id });
    }
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{titleDialog}</DialogTitle>
        <div className="w-full flex flex-col gap-y-3 my-3">
          <Input
            disabled={loading}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
            value={title}
          />
          <Textarea
            disabled={loading}
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Text..."
            className="h-[125px] resize-none "
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={loading || !title} onClick={() => onSubmit()}>
              {t('save')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
