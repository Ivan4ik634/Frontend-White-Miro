'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = Cookies.get('token')!;
    console.log(token);
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      auth: { token },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      setSocket(newSocket); // ✅ Оновлюємо стан
    });

    newSocket.on('disconnect', () => {
      setSocket(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
}
