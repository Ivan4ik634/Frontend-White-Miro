'use client';
import '@/i18n';
import { userService } from '@/services/User.service';
import { UserT } from '@/types/User';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BillingSettings } from './BillingSettings';
import { GlobalSettings } from './GlobalSettings';
import { KeysSettings } from './KeysSettings';
import { NotificationCard } from './NotificationCard';
import { ProfileCard } from './ProfileCard';
import { SecuritySettings } from './SecuritySettings';
import { ThemeCard } from './ThemeCard';

interface Props {}

export const Settings: React.FC<Props> = (props) => {
  const [profile, setProfile] = useState<UserT>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userService.profile().then((res) => {
      setProfile(res);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="h-[calc(100vh-32px)] justify-center items-center flex w-full">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  return (
    <div className="w-full flex flex-col gap-y-3">
      <ProfileCard profile={profile!} />
      <NotificationCard />
      <BillingSettings profile={profile!} />
      <SecuritySettings profile={profile!} />
      <ThemeCard />
      <KeysSettings />
      <GlobalSettings />
    </div>
  );
};
