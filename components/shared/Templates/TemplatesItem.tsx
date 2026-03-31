import { BoardTemplateT } from '@/types/Board';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IconsTemplates } from './IconsTemplates';

export const TemplatesItem: React.FC<
  BoardTemplateT & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ type, title, text, ...props }) => {
  return (
    <div
      className="cursor-pointer duration-200 transition-all bg-zinc-300/50 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-800 w-full p-5 rounded-[5px]"
      {...props}
    >
      <div className="flex items-center gap-x-4">
        <IconsTemplates type={type} />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <p className="opacity-50">{text}</p>
    </div>
  );
};
