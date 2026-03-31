import { useMessages } from '@/store/useMessages';
import { useOnlineStatus } from '@/store/useOnlineStatus';
import { usePositionUsers } from '@/store/usePositionUsers';
import { useTasks } from '@/store/useTasks';
import { MessageT } from '@/types/Message';
import { TaskT } from '@/types/Task';
import { UserT } from '@/types/User';
import { throttle } from '@/utils/throttle';
import { useEffect, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export const useConnectSocket = ({
  socket,
  roomId,
  position,
}: {
  socket: Socket | null;
  roomId: string;
  position: { x: number; y: number };
}) => {
  const { addTask, editTask, deleteTask } = useTasks();
  const { setUsers } = useOnlineStatus();
  const { addMessage } = useMessages();
  const { editPositionUser } = usePositionUsers();
  const localUserId = useAuth();
  useEffect(() => {
    if (!socket) return;
    const handleCreateTask = (task: TaskT) => {
      addTask(task);
    };
    const handleUpdateTask = ({ userId, task }: { userId: string; task: TaskT }) => {
      console.log(userId, task);
      if (userId === localUserId) return;
      editTask(task._id, { ...task });
    };
    const handleDeleteTask = ({ _id }: { _id: string }) => {
      console.log('delete task id : ', _id);
      deleteTask(_id);
    };
    const handleOnlineUsers = ({ users }: { users: UserT[] }) => {
      setUsers(users.map((user) => user._id));
    };
    const handleReceiveMessage = ({ message }: { message: MessageT }) => {
      addMessage(message);
    };
    const handleMoveUser = ({ x, y, user }: { x: number; y: number; user: UserT }) => {
      editPositionUser({ user, x, y });
    };
    socket.on('task:created', handleCreateTask);
    socket.on('task:updated', handleUpdateTask);
    socket.on('task:deleted', handleDeleteTask);
    socket.on('onlineUsers', handleOnlineUsers);
    socket.on('task:updated:isDone', handleUpdateTask);
    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('userMoved', handleMoveUser);

    return () => {
      socket.off('task:created', handleCreateTask);
      socket.off('task:updated', handleUpdateTask);
      socket.off('task:deleted', handleDeleteTask);
      socket.off('task:updated:isDone', handleUpdateTask);
      socket.off('onlineUsers', handleOnlineUsers);
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('userMoved', handleMoveUser);
    };
  }, [socket]);

  const throttledEmit = useMemo(
    () =>
      throttle((x: number, y: number) => {
        const userId = localUserId;
        socket?.emit('moveUser', { roomId, x, y, userId });
      }, 200),
    [socket, roomId],
  );

  useEffect(() => {
    if (!socket) return;
    throttledEmit(position.x, position.y);
  }, [position.x, position.y]);

  useEffect(() => {
    if (!socket) return;
    socket.emit('joinRoom', roomId);
  }, [roomId, socket]);

  useEffect(() => {
    if (!socket) return;

    const interval = setInterval(() => {
      socket.emit('userOnline', { userId: localUserId });
    }, 5000);

    return () => clearInterval(interval);
  }, [socket]);
};
