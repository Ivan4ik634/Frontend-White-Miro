'use client';
import { Button, Input } from '@/components/ui';
import { userService } from '@/services/User.service';
import { RegisterT } from '@/types/User';

import { usePlayerId } from '@/hooks/usePlayerId';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthErrorNotification } from '../ui/AuthErrorNotification';
import { AuthFooter } from '../ui/AuthFooter';

interface Props {}

export const Register: React.FC<Props> = (props) => {
  const router = useRouter();
  const query = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<RegisterT, 'playerId'>>();
  const { playerId } = usePlayerId();

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<Omit<RegisterT, 'playerId'>> = async (data) => {
    setLoading(true);
    const res = await userService.register({ ...data, playerId });
    setLoading(false);

    if ('message' in res) return toast.error(res.message);
    toast.success('Register success');
    window.location.href = `/u?isAuth=true${
      query.get('redirect_url') ? `&redirect_url=${query.get('redirect_url')}` : ''
    }`;
  };
  return (
    <>
      <div className="flex items-center justify-center ">
        <img src="/White-Miro.png" className="w-[30px] h-[30px] rounded-[3px]" />
      </div>
      <div className="mt-2 flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-y-2 mt-5 flex flex-col items-center justify-center w-full">
          <div className="w-full">
            <Input
              {...register('email', { required: 'This field required' })}
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
              {...register('username', {
                required: 'This field required',
                maxLength: { value: 15, message: 'Max. length 15' },
              })}
              placeholder="User name..."
              disabled={loading}
              className="w-full rounded-[3px] py-4 px-3"
            />
            <AuthErrorNotification>
              {errors.username?.message ? errors.username?.message : ''}
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
        redirectUrl={query.get('redirect_url') ? query.get('redirect_url') : ''}
        playerId={playerId}
        loading={loading}
        type="register-page"
      />
    </>
  );
};
