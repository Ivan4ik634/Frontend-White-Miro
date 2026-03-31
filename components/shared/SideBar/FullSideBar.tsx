'use client';
import { PAGES } from '@/config/pages';
import { LinkT } from '@/types/Link';
import Cookies from 'js-cookie';
import { LogOut, PanelRightClose } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { SideBarItem } from './SideBarItem';
interface Props {
  Links: LinkT[];
  setOpenMiniSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FullSideBar: React.FC<Props> = ({ Links, setOpenMiniSidebar }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleLogout = () => {
    Cookies.remove('isAuth');

    router.push('/app/login');
  };
  return (
    <div className="fixed  w-[250px] px-4 py-2 top-0 left-0 justify-between flex max-[900px]:hidden flex-col dark:bg-card bg-zinc-100 h-screen ">
      <div>
        <div className="flex items-center w-full justify-between">
          <Link href={PAGES.home} className="flex items-center gap-x-2">
            <Image
              priority
              alt="Logo"
              width={25}
              height={25}
              src="/White-Miro.png"
              className=" rounded-[3px] "
            />
            <h1 className="font-semibold text-xl">White Miro</h1>
          </Link>
          <PanelRightClose className="cursor-pointer" onClick={() => setOpenMiniSidebar(true)} />
        </div>
        <div className="flex flex-col mt-6 gap-y-3">
          {Links.map((link) => (
            <SideBarItem type="full" key={link.url} link={link} />
          ))}
        </div>
      </div>
      <div
        className={`w-full duration-300 cursor-pointer rounded-[5px] transition-all dark:hover:bg-zinc-800/50  hover:bg-zinc-200/50 gap-x-2 flex px-3 py-2`}
        onClick={handleLogout}>
        <LogOut className="w-6 h-6" />
        <p>{t('logout')}</p>
      </div>
    </div>
  );
};
