'use client';
import { PAGES } from '@/config/pages';
import { useLinks } from '@/hooks/useLinks';
import { LaptopIcon, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {}

export const TopBarMobile: React.FC<Props> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const linksDashboard = useLinks();
  const links = [
    ...linksDashboard,
    { url: PAGES.docsStarted, icon: LaptopIcon, name: 'Documentation' },
  ];
  return (
    <>
      <div className="hidden top-0 left-0 fixed w-full px-4 py-2 z-10 h-[50px] border-b max-[900px]:flex items-center justify-between backdrop-blur-sm">
        <Link href={PAGES.home} className="flex items-center gap-x-2">
          <Image width={25} height={25} src="/White-Miro.png" className="rounded-[3px]" alt={''} />
          <h1 className="font-semibold text-xl">White Miro</h1>
        </Link>
        <Menu className="w-[25px] h-[25px]" onClick={() => setOpenModal(true)} />
      </div>
      <div
        className={`fixed left-0 w-full h-full p-4 bg-zinc-200 dark:bg-zinc-900 z-50 transition-all ease-in-out duration-300 ${
          openModal ? 'top-0' : 'bottom-[1000%]'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold">Menu</p>
          <X onClick={() => setOpenModal(false)} />
        </div>
        <div className="gap-y-4 mt-4 flex flex-col w-full">
          {links.map((link) => (
            <Link
              href={link.url}
              onClick={() => setOpenModal(false)}
              className="flex gap-x-2 font-semibold items-center"
            >
              <link.icon />
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
