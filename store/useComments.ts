import { CommentT } from '@/types/Comment';
import { create } from 'zustand';
interface Props {
  comments: CommentT[];
  setComments: (comments: CommentT[]) => void;
  addComment: (comment: CommentT) => void;
  updateComment: (id: string, text: string) => void;
  deleteComment: (id: string) => void;
}
export const useComments = create<Props>()((set) => ({
  comments: [],
  setComments(comments) {
    set({ comments });
  },
  addComment(comment) {
    set((state) => ({ comments: [...state.comments, comment] }));
  },
  updateComment(id, text) {
    set((state) => ({
      comments: state.comments.map((obj) => (obj._id === id ? { ...obj, text } : obj)),
    }));
  },
  deleteComment(id) {
    set((state) => ({ comments: state.comments.filter((obj) => obj._id !== id) }));
  },
}));
