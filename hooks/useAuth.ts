
import { useState, useEffect, useCallback } from 'react';
import { AuthSession, User } from '../types';

/**
 * Hook to manage authentication (Mockup for Supabase/Auth systems)
 */
export const useAuth = () => {
  const [session, setSession] = useState<AuthSession>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check for existing session in localStorage
    try {
      const savedUser = localStorage.getItem('slidenova_user');
      if (savedUser) {
        setSession({ user: JSON.parse(savedUser), loading: false });
      } else {
        setSession({ user: null, loading: false });
      }
    } catch (e) {
      console.error("Failed to parse auth session", e);
      setSession({ user: null, loading: false });
    }
  }, []);

  const login = useCallback(async (email: string): Promise<User> => {
    setSession(prev => ({ ...prev, loading: true }));
    // Simulate network delay for real UX feel
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockUser: User = { 
      id: `usr_${Math.random().toString(36).substr(2, 9)}`, 
      email,
      name: email.split('@')[0]
    };
    
    localStorage.setItem('slidenova_user', JSON.stringify(mockUser));
    setSession({ user: mockUser, loading: false });
    return mockUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('slidenova_user');
    setSession({ user: null, loading: false });
  }, []);

  return { session, login, logout };
};
