import { useEffect, useState } from 'react';

export const usePlayerId = () => {
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    const waitForWindow = async () => {
      while (!(typeof window === 'undefined')) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };
    waitForWindow();

    const waitForOneSignal = async () => {
      while (!(window as any).OneSignal) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const OneSignal = (window as any).OneSignal;

      setPlayerId(OneSignal.User.PushSubscription.id);
    };

    waitForOneSignal();
  }, []);

  return { playerId };
};
