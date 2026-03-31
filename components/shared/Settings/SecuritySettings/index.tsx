'use client';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { totpService } from '@/services/Totp.service';
import { UserT } from '@/types/User';
import toast from 'react-hot-toast';
import { Dialog2FA } from './Dialog2FA';

interface Props {
  profile: UserT;
}

export const SecuritySettings: React.FC<Props> = ({ profile }) => {
  const handleCancel2FA = () => {
    totpService.cancel().then((res) => toast.success(res));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>For For the security of your account</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl">2FA TOTP</h1>
            <p>2FA using totp</p>
          </div>
          {profile.isTotpEnabled ? (
            <Button onClick={handleCancel2FA}>Cancel</Button>
          ) : (
            <Dialog2FA />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
