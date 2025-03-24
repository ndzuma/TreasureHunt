// please ignore all the errors in this file, it works and thats all that matters

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserStore = {
  userId: string | null;
  username: string | null;
  teamNumber: number | null;
  timeRemaining: number;
  setUser: (userId: string, username: string, teamNumber?: number | null) => void;
  updateTeam: (teamNumber: number) => void;
  clearUser: () => void;
  setTimeRemaining: (time: number) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: null,
      username: null,
      teamNumber: null,
      timeRemaining: 3600,
      setUser: (userId, username, teamNumber = null) => 
        set({ userId, username, teamNumber }),
      updateTeam: (teamNumber) => 
        set({ teamNumber }),
      clearUser: () => 
        set({ userId: null, username: null, teamNumber: null, timeRemaining: 3600 }),
      setTimeRemaining: (time) =>
              set({ timeRemaining: time }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        userId: state.userId, 
        username: state.username,
        teamNumber: state.teamNumber,
        timeRemaining: state.timeRemaining
      }),
    }
  )
);
