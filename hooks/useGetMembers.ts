import { userService } from '@/services/User.service';
import { UserT } from '@/types/User';
import { useEffect, useState } from 'react';

export const useGetMembers = () => {
  const [data, setData] = useState<UserT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userService.findMembers().then((res) => setData(res));
    setLoading(false);
  }, []);
  return {
    data,
    loading,
  };
};
