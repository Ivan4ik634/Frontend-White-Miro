import { create } from 'zustand';
interface Props {
  users: string[];
  setUsers: (users: string[]) => void;
}
export const useOnlineStatus = create<Props>()((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
