'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { settingsService } from '@/services/Settings.service';
import { SettingsNotificationT } from '@/types/Settings';
import { useLocalStorage } from '@white-black/react-hooks-lib';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { NotificationComponents } from './NotificationComponents';

interface Props {}

export const NotificationCard: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [settings, setSettings] = useLocalStorage<SettingsNotificationT>('settings', {
    notifications: true,
    notificationEnteringBoard: true,
    notificationTasks: true,
    notificationMessages: true,
  });
  const onChangeFull = () => {
    if (settings.notifications) {
      setSettings({
        notificationTasks: false,
        notificationEnteringBoard: false,
        notificationMessages: false,
        notifications: false,
      });
    } else {
      setSettings({
        notificationTasks: true,
        notificationEnteringBoard: true,
        notificationMessages: true,
        notifications: true,
      });
    }
  };

  const onSubmit = async () => {
    const res = await settingsService.update(settings);

    if ('message' in res) return toast.error(res.message);

    toast.success('Update notification success');
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('notifications')}</CardTitle>
        <CardDescription>{t('description_notification')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-3">
          <NotificationComponents
            checked={settings.notifications}
            title={t('notifications')}
            onCheckedChange={() => onChangeFull()}
          />
          <NotificationComponents
            title={t('notification_tasks')}
            onCheckedChange={() =>
              setSettings((prev) => ({ ...prev, notificationTasks: !settings.notificationTasks }))
            }
            disabled={!settings.notifications}
            checked={settings.notificationTasks}
          />
          <NotificationComponents
            title={t('notification_entering_board')}
            onCheckedChange={() =>
              setSettings((prev) => ({
                ...prev,
                notificationEnteringBoard: !settings.notificationEnteringBoard,
              }))
            }
            disabled={!settings.notifications}
            checked={settings.notificationEnteringBoard}
          />
          <NotificationComponents
            title={t('notification_messages')}
            onCheckedChange={() =>
              setSettings((prev) => ({
                ...prev,
                notificationMessages: !settings.notificationMessages,
              }))
            }
            disabled={!settings.notifications}
            checked={settings.notificationMessages}
          />
        </div>
        <div className="flex justify-end mt-3">
          <Button onClick={() => onSubmit()}>{t('save')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};
