import { create } from 'zustand';

interface UserActions {
  setUser: (User: any) => void;
  resetStates: () => void;
  setAuthEmail: (email: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface UserStates {
  user: any;
  authEmail: string;
  isLoading: boolean;
}

interface UserStore extends UserStates, UserActions {}

const initialUserStates: UserStates = {
  user: null,
  authEmail: '',
  isLoading: true,
};

export const userStore = create<UserStore>((set) => ({
  ...initialUserStates,
  setUser: (user) => set({ user }),
  setAuthEmail: (email) => set({ authEmail: email }),
  setIsLoading: (isLoading) => set({ isLoading }),
  resetStates: () => set(initialUserStates),
}));
