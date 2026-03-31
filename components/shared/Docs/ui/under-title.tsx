import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  className?: string;
  children: ReactNode;
}

export const DocsUnderTitle: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <h3 {...props} className={cn(`font-semibold text-2xl`, className)}>
      {children}
    </h3>
  );
};
