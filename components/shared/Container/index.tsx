'use client';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
  openMiniSidebar?: boolean;
}

export const Container: React.FC<Props> = ({ openMiniSidebar, children, className = '' }) => {
  return (
    <div
      className={cn(
        `${
          openMiniSidebar ? 'ml-[60px]' : 'ml-[250px]'
        } max-[1200px]:my-[50px]  max-[900px]:ml-0 py-3 px-6 max-[900px]:py-1 max-[900px]:px-3`,
        className,
      )}
    >
      {children}
    </div>
  );
};
