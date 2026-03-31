import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const ThemeComponent: React.FC<Props> = ({ children, className = '', ...props }) => {
  return (
    <div
      {...props}
      className={`w-full px-3 py-4 h-[350px] border cursor-pointer rounded-[8px] ${className}`}
    >
      {children}
    </div>
  );
};
