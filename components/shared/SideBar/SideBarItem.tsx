'use client';
import { LinkT } from '@/types/Link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  link: LinkT;
  type: 'mini' | 'full';
}

export const SideBarItem: React.FC<Props> = ({ link, type }) => {
  const pathname = usePathname();
  return type === 'full' ? (
    <Link
      href={link.url}
      className={`w-full duration-300 rounded-[5px] transition-all  hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 gap-x-2 flex px-3 py-2 ${
        pathname === link.url ? ' bg-zinc-200/50 dark:bg-zinc-800/50' : ''
      }`}>
      <link.icon className="w-6 h-6" />
      <p>{link.name}</p>
    </Link>
  ) : (
    <Link
      href={link.url}
      className={`p-2 rounded-[5px] group duration-300 transition-all hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 ${
        pathname === link.url ? 'bg-zinc-200/50 dark:bg-zinc-800/50' : ''
      }`}>
      <link.icon
        className={`w-[25px] h-[25px] opacity-50 group-hover:opacity-100 duration-300 transition-all text-black dark:text-white  ${
          pathname === link.url ? 'opacity-100' : ''
        }`}
      />
    </Link>
  );
};
