import { Button } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

interface Props {
  type: 'register-page' | 'login-page';
  loading: boolean;
  playerId: string;
  redirectUrl: string | null;
}

export const AuthFooter: React.FC<Props> = ({ type, loading, playerId, redirectUrl }) => {
  return (
    <div className="mt-5 flex flex-col items-center gap-y-3 justify-center">
      <Link
        href={`https://github.com/login/oauth/authorize?client_id=${process.env
          .NEXT_PUBLIC_GITHUB_CLIENT_ID!}&scope=user:email&state=${playerId}${
          redirectUrl ? `&redirect_url=${redirectUrl}` : ''
        }`}
        className="w-full cursor-pointer flex items-center justify-center "
      >
        <Button disabled={loading} variant="outline" className="w-full gap-x-2 flex items-center">
          <GithubIcon /> Login with Github
        </Button>
      </Link>
      <Link
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/google?playerId=${playerId}${
          redirectUrl ? `&redirect_url=${redirectUrl}` : ''
        }`}
        className="w-full cursor-pointer flex items-center justify-center "
      >
        <Button disabled={loading} variant="outline" className="w-full gap-x-2 flex items-center">
          <FcGoogle />
          Login with Google
        </Button>
      </Link>
      {type === 'register-page' ? (
        <p className="text-zinc-500">
          Already have an account?{' '}
          <Link
            href={PAGES.login + `${redirectUrl ? `?redirect_url=${redirectUrl}` : ''}`}
            className="text-black dark:text-white"
          >
            Login
          </Link>
        </p>
      ) : (
        <p className="text-zinc-500">
          Don't have an account?{' '}
          <Link
            href={PAGES.register + `${redirectUrl ? `?redirect_url=${redirectUrl}` : ''}`}
            className="text-black dark:text-white"
          >
            Register
          </Link>
        </p>
      )}
    </div>
  );
};
