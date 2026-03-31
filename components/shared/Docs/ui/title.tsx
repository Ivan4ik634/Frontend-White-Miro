import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  className?: string;
  children: ReactNode;
}

export const DocsTitle: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <h2 {...props} className={cn(`font-bold text-3xl max-[500px]:text-xl`, className)}>
      {children}
    </h2>
  );
};
