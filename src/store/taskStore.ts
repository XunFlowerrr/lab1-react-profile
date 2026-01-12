import { create } from 'zustand';

export type TaskStatus = 'Todo' | 'Doing' | 'Done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: string;
}

interface TaskState {
  tasks: Task[];
  assignTask: (taskId: string, assignee: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    { id: '1', title: 'Setup project', status: 'Done', assignee: 'Tanit' },
    { id: '2', title: 'Implement Auth', status: 'Doing', assignee: 'Tanit' },
    { id: '3', title: 'Design Dashboard', status: 'Todo', assignee: 'Jane' },
    { id: '4', title: 'Testing', status: 'Todo', assignee: 'John' },
    { id: '5', title: 'Deployment', status: 'Todo', assignee: 'Tanit' },
  ],
  assignTask: (taskId, assignee) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, assignee } : task
    ),
  })),
}));
