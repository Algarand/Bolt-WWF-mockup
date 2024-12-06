import { create } from 'zustand';
import { WellnessCategory } from '../types/survey';
import { authService } from '../services/auth.service';
import { dbService } from '../services/database.service';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    category?: WellnessCategory;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserCategory: (category: WellnessCategory) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    try {
      const user = await authService.signIn(email, password);
      if (user) {
        const profile = await dbService.getUserProfile(user.id);
        set({
          isAuthenticated: true,
          user: {
            id: user.id,
            name: profile.name,
            email: user.email!,
            category: profile.category as WellnessCategory | undefined,
          },
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  signup: async (email, password, name) => {
    try {
      const user = await authService.signUp(email, password, name);
      if (user) {
        set({
          isAuthenticated: true,
          user: {
            id: user.id,
            name,
            email: user.email!,
          },
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await authService.signOut();
      set({
        isAuthenticated: false,
        user: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  updateUserCategory: async (category) => {
    set((state) => {
      if (!state.user) return state;
      
      dbService.updateUserCategory(state.user.id, category);
      
      return {
        user: { ...state.user, category },
      };
    });
  },
}));