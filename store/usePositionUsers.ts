import { UserT } from '@/types/User';
import { create } from 'zustand';
interface Props {
  positionUsers: { x: number; y: number; user: UserT }[];

  setPositionUsers: (positionUsers: { x: number; y: number; user: UserT }[]) => void;
  editPositionUser: (positionUser: { x: number; y: number; user: UserT }) => void;
}
export const usePositionUsers = create<Props>()((set) => ({
  positionUsers: [],
  setPositionUsers(positionUsers) {
    set({ positionUsers });
  },
  editPositionUser(positionUser) {
    set((state) => ({
      positionUsers: state.positionUsers.map((p) =>
        p.user._id === positionUser.user._id ? positionUser : p,
      ),
    }));
  },
}));
