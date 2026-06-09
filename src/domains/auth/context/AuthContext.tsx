import { useState, useCallback, type ReactNode } from 'react';
import { AuthContext } from './useAuth';
import type { AuthContextValue } from './useAuth';
import { VALID_CREDENTIALS } from '../data/auth-mock-data';

interface User {
  username: string;
  role: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login: AuthContextValue['login'] = useCallback(
    async (username, password) => {
      await new Promise((r) => setTimeout(r, 800));

      if (
        username === VALID_CREDENTIALS.username &&
        password === VALID_CREDENTIALS.password
      ) {
        setUser({ username, role: 'admin' });
        return { success: true };
      }
      return { success: false, error: 'Invalid username or password' };
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
