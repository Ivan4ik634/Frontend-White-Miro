import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui';
import { totpService } from '@/services/Totp.service';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {}

export const Dialog2FA: React.FC<Props> = (props) => {
  const [qrcode, setQrcode] = useState('');
  const [secret, setSecret] = useState('');
  const [totpCode, setTotpCode] = useState('');
  useEffect(() => {
    totpService.generate().then((res) => {
      setQrcode(res.qr);
      setSecret(res.secret);
    });
  }, []);

  const handleVerifyCode = () => {
    totpService.verify({ token: totpCode }).then((res) => toast.success(res));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>2FA</DialogTitle>
        <div className="flex items-center flex-col justify-center max-w-full">
          <img src={qrcode} className="w-[150px] h-[150px]" />
          <p className="font-bold text-xl my-3">Or</p>
          <p className="text-sm">{secret}</p>

          <div className="mt-8 flex items-center flex-col ">
            <p className="text-xl font-semibold">Enter the code</p>
            <div className="w-full mt-5">
              <InputOTP value={totpCode} onChange={(e) => setTotpCode(e)} maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />

                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <DialogFooter className="mt-5 w-full flex items-end justify-end max-[500px]:items-start max-[500px]:justify-start max-[500px]:flex ">
            <DialogClose asChild>
              <Button variant="destructive" className="max-[500px]:w-full">
                Close
              </Button>
            </DialogClose>
            <Button
              className="max-[500px]:w-full"
              onClick={handleVerifyCode}
              disabled={totpCode.length !== 6}
            >
              Submit
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
