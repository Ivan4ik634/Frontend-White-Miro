import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  className?: string;
  children: ReactNode;
}

export const AuthErrorNotification: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <h6 {...props} className={cn(`text-red-500 flex items-start justify-start text-sm`, className)}>
      {children}
    </h6>
  );
};
