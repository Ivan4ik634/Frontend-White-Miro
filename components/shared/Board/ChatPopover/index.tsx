'use client';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useMessages } from '@/store/useMessages';
import { MessageSquare, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Message } from './Message';

interface Props {
  socket: Socket;
  roomId: string;
}

export const ChatPopover: React.FC<Props> = ({ socket, roomId }) => {
  const [text, setText] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  const { messages } = useMessages();
  const userId = useAuth();

  const onSubmit = async () => {
    if (!text) return;
    socket.emit('sendMessage', { text, roomId });
    setText('');
  };
  useEffect(() => {
    if (ref) ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);
  return (
    <Popover>
      <PopoverTrigger className="absolute bottom-4 right-4 bg-white dark:bg-zinc-900 p-3  rounded-full shadow text-sm">
        <MessageSquare />
      </PopoverTrigger>
      <PopoverContent className="w-[375px]">
        <div className="h-[425px] w-full">
          <ScrollArea className="h-[375px] w-full">
            <div className="gap-y-3 flex flex-col">
              {messages.length !== 0 ? (
                messages.map((obj) => <Message userId={userId} message={obj} key={obj._id} />)
              ) : (
                <p className="flex items-center justify-center">Not messages</p>
              )}
            </div>
            <div ref={ref} />
          </ScrollArea>
          <div className="h-[50px] flex items-center gap-x-2 w-full">
            <Input
              value={text}
              placeholder="Type a message..."
              className="w-full"
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            />
            <Button disabled={!text} onClick={onSubmit}>
              <Send />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
