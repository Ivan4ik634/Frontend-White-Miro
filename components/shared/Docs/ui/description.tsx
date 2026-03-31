import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  className?: string;
  children: ReactNode;
}

export const DocsDescription: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <p {...props} className={cn(`text-zinc-500 text-xl max-[500px]:text-sm`, className)}>
      {children}
    </p>
  );
};
