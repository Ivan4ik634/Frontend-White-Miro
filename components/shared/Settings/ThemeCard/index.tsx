import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useLocalStorage } from '@white-black/react-hooks-lib';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeComponent } from './ThemeComponent';

interface Props {}

export const ThemeCard: React.FC<Props> = (props) => {
  const {t} = useTranslation()
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("themes")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-x-3 grid-cols-2">
          <ThemeComponent onClick={() => setTheme('light')} className="flex items-center justify-center bg-zinc-200">
            <p className="font-bold text-2xl text-zinc-800">{t('light')}</p>
          </ThemeComponent>
          <ThemeComponent onClick={() => setTheme('dark')} className="flex items-center justify-center bg-zinc-800">
            <p className="font-bold text-2xl text-zinc-200">{t('dark')}</p>
          </ThemeComponent>
        </div>
      </CardContent>
    </Card>
  );
};
