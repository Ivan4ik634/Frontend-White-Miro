'use client';
import { linksDocs } from '@/data/linksDocs';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {}

export const DocsHeaderMobile: React.FC<Props> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="hidden cursor-pointer top-[50px] left-0 fixed w-full px-4 py-2 z-10 h-[50px] border-b max-[900px]:flex items-center justify-between backdrop-blur-sm"
      >
        <p className="text-xl font-semibold">Docs menu</p>
      </div>
      <div
        className={`fixed left-0 w-full h-full p-4 bg-zinc-200 dark:bg-zinc-900 z-50 transition-all ease-in-out duration-300 ${
          openModal ? 'top-0' : 'bottom-[1000%]'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold">Docs Menu</p>
          <X onClick={() => setOpenModal(false)} />
        </div>
        <div className="gap-y-4 mt-4 flex flex-col w-full">
          {linksDocs.map((link) => (
            <Link
              href={link.url}
              onClick={() => setOpenModal(false)}
              className="flex gap-x-2 font-semibold items-center"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
