'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  url: string;
  title: string;
}

export const DocsLeftBarItem: React.FC<Props> = ({ url, title }) => {
  const pathname = usePathname();
  return (
    <Link href={url}>
      <p
        className={`opacity-50 duration-300 hover:opacity-100 transition-all ${
          pathname === url ? ' font-bold opacity-100' : ''
        }`}
      >
        {title}
      </p>
    </Link>
  );
};
