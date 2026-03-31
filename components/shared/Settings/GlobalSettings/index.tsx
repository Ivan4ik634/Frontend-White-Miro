import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useLocalStorage } from '@white-black/react-hooks-lib';
import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface Props {}

export const GlobalSettings: React.FC<Props> = (props) => {
  const [lang, setLang] = useLocalStorage<'en' | 'ua'>('lang', 'en');
  const { i18n, t } = useTranslation();

  const handleLogout = () => {
    Cookies.remove('isAuth');

    window.location.href = '/app/login';
  };

  const changeLanguage = (lng: 'en' | 'ua') => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('global_settings')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex items-center justify-between px-3 py-2">
            <div>
              <p className="font-semibold">{t('leave_account')}</p>
            </div>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut />
              {t('logout')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
