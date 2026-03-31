'use client';
import {
  Button,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui';
import { usePlayerId } from '@/hooks/usePlayerId';
import { userService } from '@/services/User.service';
import { LoginT } from '@/types/User';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthErrorNotification } from '../ui/AuthErrorNotification';
import { AuthFooter } from '../ui/AuthFooter';

interface Props {}

export const Login: React.FC<Props> = (props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Omit<LoginT, 'code'>, 'playerId'>>();
  const { playerId } = usePlayerId();
  const query = useSearchParams();

  const [totpCode, setTotpCode] = useState('');
  const [form, setForm] = useState<'login' | 'totp'>('login');

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<Omit<Omit<LoginT, 'code'>, 'playerId'>> = async (data) => {
    setLoading(true);
    const res = await userService.login({ ...data, code: totpCode, playerId });
    setLoading(false);

    if ('message' in res) {
      if (res.message === 'Go through Totp') {
        setForm('totp');
        return toast.success('Go through Totp');
      }
      return toast.error(res.message);
    }
    toast.success('Login success');
    window.location.href = `/u?isAuth=true${
      query.get('redirect_url') ? `&redirect_url=${query.get('redirect_url')}` : ''
    }`;
  };
  return form === 'login' ? (
    <>
      <div className="flex items-center justify-center ">
        <img src="/White-Miro.png" className="w-[30px] h-[30px] rounded-[3px]" />
      </div>
      <div className="mt-2 flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-y-2 mt-5 flex flex-col justify-center items-center w-full">
          <div className="w-full">
            <Input
              {...register('email', {
                required: 'This field required',
              })}
              placeholder="Email..."
              disabled={loading}
              className="w-full rounded-[3px] py-4 px-3"
            />
            <AuthErrorNotification>
              {errors.email?.message ? errors.email?.message : ''}
            </AuthErrorNotification>
          </div>

          <div className="w-full">
            <Input
              {...register('password', {
                required: 'This field required',
                minLength: { value: 3, message: 'Min. length 3' },
              })}
              placeholder="Password..."
              disabled={loading}
              className="w-full rounded-[3px] py-4 px-3"
            />
            <AuthErrorNotification>
              {errors.password?.message ? errors.password?.message : ''}
            </AuthErrorNotification>
          </div>

          <Button disabled={loading} className="w-full">
            Submit
          </Button>
        </form>
      </div>
      <AuthFooter
        playerId={playerId}
        redirectUrl={query.get('redirect_url') ? query.get('redirect_url') : ''}
        loading={loading}
        type="login-page"
      />
    </>
  ) : (
    <>
      <div className="flex items-center justify-center ">
        <img src="/White-Miro.png" className="w-[30px] h-[30px] rounded-[3px]" />
      </div>
      <div className="mt-2 flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">2FA</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-y-2 mt-5 flex flex-col justify-center items-center w-full">
          <div className="w-full mb-5 flex justify-center items-center">
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

          <Button disabled={loading || totpCode.length !== 6} className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
