import { Switch } from '@/components/ui';
import { SwitchProps } from '@radix-ui/react-switch';
import { RefAttributes } from 'react';

interface Props extends SwitchProps, RefAttributes<HTMLButtonElement> {
  title: string;
}

export const NotificationComponents: React.FC<Props> = ({ title, ...props }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="font-semibold">{title}</h1>
      </div>
      <Switch {...props} />
    </div>
  );
};
