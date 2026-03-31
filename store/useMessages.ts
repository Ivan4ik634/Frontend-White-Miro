import { MessageT } from '@/types/Message';
import { create } from 'zustand';
interface Props {
  messages: MessageT[];
  setMessages: (messages: MessageT[]) => void;
  addMessage: (message: MessageT) => void;
}
export const useMessages = create<Props>()((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
