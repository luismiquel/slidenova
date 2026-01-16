
import { useEffect } from 'react';
import { AuthSession } from '../types';

/**
 * Hook to protect routes/views.
 * Redirects to auth view if user is not logged in.
 */
export const useProtectedRoute = (
  session: AuthSession,
  onRedirect: () => void,
  active: boolean = true
) => {
  useEffect(() => {
    if (active && !session.loading && !session.user) {
      onRedirect();
    }
  }, [session, onRedirect, active]);
};
