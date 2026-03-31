'use client';
import { linksMobile } from '@/data/linksMobile';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {}

export const BottomBarMobile: React.FC<Props> = (props) => {
  const pathname = usePathname();
  return (
    <div className="hidden max-[900px]:flex backdrop-blur-sm border-t fixed items-center z-10 justify-between px-4 py-2 w-full bottom-0 left-0 h-[50px]">
      {linksMobile.map((link) => (
        <Link
          href={link.url}
          className={`flex flex-col items-center opacity-50 ${
            pathname === link.url ? 'opacity-100' : ''
          }`}
        >
          <link.icon size={25} />
          <p className="text-xs">{link.name}</p>
        </Link>
      ))}
    </div>
  );
};
