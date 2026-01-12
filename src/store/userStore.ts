import { create } from 'zustand';
import { INITIAL_USERS } from '@/data/users';

interface UserState {
  users: string[];
  addUser: (name: string) => void;
  deleteUser: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: INITIAL_USERS,
  addUser: (name) => set((state) => ({
    users: state.users.includes(name) ? state.users : [...state.users, name]
  })),
  deleteUser: (name) => set((state) => ({
    users: state.users.filter((u) => u !== name)
  })),
}));
