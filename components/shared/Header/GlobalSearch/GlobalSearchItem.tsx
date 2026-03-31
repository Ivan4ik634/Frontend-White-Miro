import { Folder, NotepadText, StickyNote } from 'lucide-react';
import Link from 'next/link';

interface Props {
  title: string;
  type?: 'page' | 'task' | 'board';
  url: string;
}

export const GlobalSearchItem: React.FC<Props> = ({ title, url, type = 'page' }) => {
  return (
    <Link
      className="flex items-center gap-x-2 p-2 rounded-[5px] w-full duration-100 transition-all hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
      href={url}
    >
      {type === 'page' ? <StickyNote /> : type === 'board' ? <Folder /> : <NotepadText />}
      {title}
    </Link>
  );
};
