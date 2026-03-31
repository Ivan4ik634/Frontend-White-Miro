import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { boardService } from '@/services/Board.service';
import { Globe, Lock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  status: 'locked' | 'public';
}

export const StatusAccess: React.FC<Props> = ({ status }) => {
  const param: { id: string } = useParams();
  const [selected, setSelected] = useState<'locked' | 'public'>(status);
  const { t } = useTranslation();
  useEffect(() => {
    boardService.update({ access: selected }, param.id!);
  }, [selected]);
  return (
    <>
      <p className="font-bold text-xl">{t('public_access')}</p>
      <div className="flex gap-x-2 items-center">
        {selected === 'locked' ? (
          <div className="p-3 rounded-full bg-zinc-200  dark:bg-zinc-800">
            <Lock />
          </div>
        ) : (
          <div className="p-3 rounded-full bg-green-400 ">
            <Globe />
          </div>
        )}
        <div className="">
          <Select value={selected} onValueChange={(v: 'locked' | 'public') => setSelected(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select access" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="locked">{t('locked_access')}</SelectItem>
              <SelectItem value="public">{t('public_access')}</SelectItem>
            </SelectContent>
          </Select>
          {selected === 'locked' ? (
            <>
              <p>{t('description_locked_access')}</p>
            </>
          ) : (
            <>
              <p>{t('description_public_access')} </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
