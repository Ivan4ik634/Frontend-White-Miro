import { TaskT, UpdateTaskT } from '@/types/Task';
import { create } from 'zustand';
interface Props {
  tasks: { boardId: string; tasks: TaskT[] };
  setTasks: (tasks: { boardId: string; tasks: TaskT[] }) => void;
  setNodes: (boardId: string, tasks: TaskT[]) => void;
  addTask: (task: TaskT) => void;
  addEdge: (from: string, to: string) => void;
  deleteEdge: (from: string, to: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, data: UpdateTaskT) => void;
}
export const useTasks = create<Props>()((set) => ({
  tasks: { boardId: '', tasks: [] },
  setTasks: (tasks: { boardId: string; tasks: TaskT[] }) => set({ tasks }),
  setNodes: (boardId: string, tasks: TaskT[]) => set({ tasks: { boardId, tasks } }),

  deleteEdge: (from: string, to: string) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        tasks: state.tasks.tasks.map((t) => {
          if (t._id === from) {
            return { ...t, edges: t.edges.filter((e) => e.to !== to) };
          }
          if (t._id === to) {
            return { ...t, edges: t.edges.filter((e) => e.from !== from) };
          }
          return t;
        }),
      },
    })),

  addTask: (task: TaskT) =>
    set((state) => ({ tasks: { ...state.tasks, tasks: [...state.tasks.tasks, task] } })),

  addEdge: (from, to) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        tasks: state.tasks.tasks.map((t) =>
          t._id === from ? { ...t, edges: [...t.edges, { from, to }] } : t,
        ),
      },
    })),
  deleteTask: (id: string) =>
    set((state) => ({
      tasks: { ...state.tasks, tasks: state.tasks.tasks.filter((t) => t._id !== id) },
    })),
  editTask: (
    id: string,
    data: { text?: string; edges?: { from: string; to: string }[]; x?: number; y?: number },
  ) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        tasks: state.tasks.tasks.map((t) => (t._id === id ? { ...t, ...data } : t)),
      },
    })),
}));
