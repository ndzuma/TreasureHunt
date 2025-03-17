// please ignore all the errors in this file, it works and thats all that matters

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  userId: string | null;
  username: string | null;
  teamNumber: number | null;
  setUser: (userId: string, username: string, teamNumber?: number | null) => void;
  updateTeam: (teamNumber: number) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: null,
      username: null,
      teamNumber: null,
      setUser: (userId, username, teamNumber = null) => 
        set({ userId, username, teamNumber }),
      updateTeam: (teamNumber) => 
        set({ teamNumber }),
      clearUser: () => 
        set({ userId: null, username: null, teamNumber: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
