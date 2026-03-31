'use client';

import { PAGES } from '@/config/pages';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
interface Props {}

export const RedirectPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    if (!search.get('isAuth')) return;
    Cookies.set('isAuth', search.get('isAuth')!, { expires: 30 });
    router.push(search.get('redirect_url') ?? PAGES.boards);
  }, []);
  return <></>;
};
