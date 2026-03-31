import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useFilters } from '@/store/useFilters';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  type?: 'not-filters' | 'all' | 'not-sorts';
}

export const Filters: React.FC<Props> = ({ type }) => {
  const { setFilters, filters } = useFilters();
  const { t } = useTranslation();

  return (
    <div className="flex items-center my-5 justify-between w-full max-[500px]:flex-col max-[500px]:items-start max-[500px]:justify-start">
      <div className="gap-x-2 w-full flex items-center">
        {type !== 'not-filters' && (
          <Select
            value={filters.filter}
            onValueChange={(v: 'all' | 'shared') => setFilters({ filter: v })}>
            <SelectTrigger>
              <SelectValue placeholder={t('filters')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters_all')}</SelectItem>
              <SelectItem value="shared">{t('filters_shared')}</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Select
          value={filters.sort}
          onValueChange={(v: 'name' | 'date') => setFilters({ sort: v })}>
          <SelectTrigger>
            <SelectValue placeholder={t('sort')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">{t('sort_name')}</SelectItem>
            <SelectItem value="date">{t('sort_date')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative max-[500px]:mt-3 ">
        <Input
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="rounded-full w-[400px]  pr-[50px] max-[500px]:w-full max-[500px]:pr-0"
          placeholder={t('search')}
        />
        <Search className="top-[50%] right-2 absolute translate-[-50%] " />
      </div>
    </div>
  );
};
