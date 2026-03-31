import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { userService } from '@/services/User.service';
import { useEffect, useState } from 'react';
import Code from '../../Docs/ui/code';
interface Props {}

export const DialogKeysSettings: React.FC<Props> = (props) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    userService.getToken().then((res) => setToken(res.token));
  }, []);
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] max-[500px]:w-[300px]">
        <DialogTitle>Token</DialogTitle>
        <div className="my-3 w-[calc(500px-48px)] max-[500px]:w-[calc(300px-48px)]">
          <Code language="bash" code={`${token}`} />
        </div>
        <DialogFooter className="gap-x-2 w-full flex items-center">
          <Button className="max-[500px]:w-full" variant="destructive">
            Cancel
          </Button>
          <Button className="max-[500px]:w-full">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
