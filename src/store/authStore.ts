import { create } from 'zustand';

export type Role = 'Admin' | 'User';

interface User {
  id: string;
  name: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: { id: '1', name: 'Demo User', role: 'User' }, // Default to User for testing
  login: (role: Role) => set({ user: { id: '1', name: `Demo ${role}`, role } }),
  logout: () => set({ user: null }),
}));
