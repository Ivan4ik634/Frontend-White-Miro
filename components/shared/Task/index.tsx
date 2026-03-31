import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Checkbox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuDiv,
  ContextMenuTrigger,
} from '@/components/ui';
import { PAGES } from '@/config/pages';
import { useAuth } from '@/hooks/useAuth';
import { useCopyText } from '@/hooks/useCopyText';
import { cn } from '@/lib/utils';
import { useTasks } from '@/store/useTasks';
import { TaskT } from '@/types/Task';
import { UserT } from '@/types/User';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Socket } from 'socket.io-client';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { TaskDialog } from './TaskDialog';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  node: TaskT;
  socket: Socket;
  className?: string;
  onStartConnect: (id: string, x: number, y: number) => void;
  onEndConnect: (id: string) => void;
}

export const Task: React.FC<Props> = ({
  node,
  socket,
  onStartConnect,
  onEndConnect,
  className,
  ...props
}) => {
  const { copyText } = useCopyText(node.text);
  const param: { id: string } = useParams();
  const { t } = useTranslation();
  const [isDone, setIsDone] = useState(node.isDone);
  const { editTask } = useTasks();
  const userId = useAuth();

  const handleDelete = async () => {
    socket.emit('task:delete', { roomId: param.id, userId, _id: node._id });
  };
  const avtor = node.userId as UserT;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            `absolute z-10 w-[300px] h-auto py-5 px-4 gap-x-2  items-start bg-white dark:bg-zinc-900  shadow-md rounded-[5px] flex  select-none cursor-grab active:cursor-grabbing`,
            className,
          )}
          style={{ left: node.x, top: node.y }}
          {...props}
        >
          <div className="flex w-full flex-col">
            <div className="flex w-full  items-center justify-between">
              <div className="flex gap-x-2 items-center">
                {isDone ? (
                  <>
                    <div className="w-[5px] h-[5px] bg-green-500 rounded-full" />
                    <p className="text-sm text-green-500">Done</p>
                  </>
                ) : (
                  <>
                    <div className="w-[5px] h-[5px] bg-yellow-500 rounded-full" />
                    <p className="text-sm text-yellow-500">In planning</p>
                  </>
                )}
              </div>
              <div className="flex gap-x-2 items-center">
                <Avatar className="w-[15px] h-[15px] ">
                  <AvatarFallback>{avtor.username[0]}</AvatarFallback>
                  <AvatarImage src={avtor.avatar} />
                </Avatar>
                <p className="text-sm">{avtor.username}</p>
              </div>
            </div>
            <div className="flex mt-4 gap-x-2">
              <Checkbox
                checked={isDone}
                onCheckedChange={(checked) => {
                  console.log('Toggle checkbox clicked');
                  editTask(node._id!, { isDone: !!checked });
                  socket.emit('task:update:isDone', {
                    isDone: checked,
                    userId,
                    _id: node._id,
                    roomId: param.id,
                  });
                  setIsDone(!!checked);
                }}
              />

              <div>
                <h1 className="font-bold">{node.title}</h1>
              </div>
            </div>
          </div>
          <div
            onPointerDown={(e) => {
              e.stopPropagation();
              onStartConnect(node._id, node.x + 300, node.y + 40);
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              onEndConnect(node._id);
            }}
            className="absolute  w-4 h-4  bg-blue-500 rounded-full bottom-[-16px] left-1/2 -translate-y-1/2 cursor-crosshair"
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Link href={PAGES.task(node._id)}>
          <ContextMenuDiv>{t('info_task')}</ContextMenuDiv>
        </Link>

        <ContextMenuDiv onClick={() => copyText()}>{t('copy_text')}</ContextMenuDiv>

        <TaskDialog socket={socket} type="edit" task={node}>
          <ContextMenuDiv>{t('edit_task')}</ContextMenuDiv>
        </TaskDialog>
        <ConfirmationDialog title={'delete task'} onSubmit={handleDelete}>
          <ContextMenuDiv>{t('delete_task')}</ContextMenuDiv>
        </ConfirmationDialog>
      </ContextMenuContent>
    </ContextMenu>
  );
};
