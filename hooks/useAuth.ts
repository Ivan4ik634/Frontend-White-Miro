import { userService } from '@/services/User.service';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    userService.getUserId().then((res) => setUserId(res.userId));
  }, []);

  return userId;
};
