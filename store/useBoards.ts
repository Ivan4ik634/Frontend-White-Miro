import { BoardT, UpdateBoardT } from '@/types/Board';
import { create } from 'zustand';
interface Props {
  boards: BoardT[];
  setBoards: (boards: BoardT[]) => void;
  addBoard: (board: BoardT) => void;
  deleteBoard: (id: string) => void;
  editBoard: (id: string, data: UpdateBoardT) => void;
  toggleBoardLike: (id: string, userId: string) => void;
}
export const useBoards = create<Props>()((set) => ({
  boards: [],
  setBoards: (boards: BoardT[]) => set({ boards: boards }),
  addBoard: (board: BoardT) => set((state) => ({ boards: [...state.boards, board] })),
  deleteBoard: (id: string) =>
    set((state) => ({ boards: state.boards.filter((b) => b._id !== id) })),
  editBoard: (id, data) =>
    set((state) => ({ boards: state.boards.map((b) => (b._id === id ? { ...b, ...data } : b)) })),

  toggleBoardLike: (id: string, userId: string) =>
    set((state) => ({
      boards: state.boards.map((b) =>
        b._id === id
          ? {
              ...b,
              liked: b.liked.includes(userId)
                ? b.liked.filter((u) => u !== userId)
                : [...b.liked, userId],
            }
          : b,
      ),
    })),
}));
