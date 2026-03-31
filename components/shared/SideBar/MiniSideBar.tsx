import { PAGES } from '@/config/pages';
import { LinkT } from '@/types/Link';
import Cookies from 'js-cookie';
import { LogOut, PanelRightOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SideBarItem } from './SideBarItem';

interface Props {
  Links: LinkT[];
  setOpenMiniSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MiniSideBar: React.FC<Props> = ({ Links, setOpenMiniSidebar }) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('isAuth');

    router.push('/app/login');
  };
  return (
    <div className="fixed  w-[60px] px-4 py-2 top-0 left-0 justify-between items-center flex max-[900px]:hidden flex-col dark:bg-card bg-zinc-100 h-screen ">
      <div>
        <div className="flex items-center w-full flex-col gap-y-3 mb-4">
          <Link href={PAGES.home}>
            <Image
              priority
              alt="Logo"
              width={25}
              height={25}
              src="/White-Miro.png"
              className="rounded-[3px]"
            />
          </Link>
          <PanelRightOpen
            className={`w-[25px] cursor-pointer h-[25px] opacity-50 hover:opacity-100 duration-300 transition-all text-black dark:text-white `}
            onClick={() => setOpenMiniSidebar(false)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          {Links.map((link) => (
            <SideBarItem type="mini" key={link.url} link={link} />
          ))}
        </div>
      </div>
      <div
        className={`p-2 rounded-[5px] cursor-pointer duration-300 group transition-all hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50`}
        onClick={handleLogout}
      >
        <LogOut className="w-[25px] h-[25px] opacity-50 group-hover:opacity-100 duration-300 transition-all text-black dark:text-white" />
      </div>
    </div>
  );
};
