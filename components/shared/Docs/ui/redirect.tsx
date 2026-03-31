import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  className?: string;
  href: string;
  children: ReactNode;
}

export const DocsRedirect: React.FC<Props> = ({ href, className, children, ...props }) => {
  return (
    <Link
      href={href}
      {...props}
      className={cn(`hover:underline text-black dark:text-white`, className)}
    >
      {children}
    </Link>
  );
};
