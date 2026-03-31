import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const DocsSection: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn(`mb-6`, className)}>
      {children}
    </div>
  );
};
