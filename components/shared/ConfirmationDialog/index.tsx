import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { MouseEventHandler } from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

export const ConfirmationDialog: React.FC<Props> = ({ children, onSubmit, title }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogDescription>Confirmation {title}</DialogDescription>
        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onSubmit}>Submit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
