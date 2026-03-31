import { create } from 'zustand';
interface Props {
  filters: { sort: 'name' | 'date'; filter: 'all' | 'shared'; search: string };
  setFilters: (filters: {
    sort?: 'name' | 'date';
    filter?: 'all' | 'shared';
    search?: string;
  }) => void;
}
export const useFilters = create<Props>()((set) => ({
  filters: { sort: 'name', filter: 'all', search: '' },
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
