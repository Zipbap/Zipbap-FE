import { create } from 'zustand';
import { getTokens } from './token';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,

  isLoading: true,

  setAuthenticated: value => set({ isAuthenticated: value }),

  checkAuth: async () => {
    try {
      const tokens = await getTokens();
      // FIXME: 추후삭제
      console.log(tokens);
      set({ isAuthenticated: !!tokens?.accessToken });
    } catch (error) {
      console.error('인증 확인 실패:', error);
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
