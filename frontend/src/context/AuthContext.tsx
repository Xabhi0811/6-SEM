import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../services/api';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = 'realtime-dashboard-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { user: User; token: string };
      setUser(parsed.user);
      setToken(parsed.token);
    }
    setLoading(false);
  }, []);

  const persist = (nextUser: User | null, nextToken: string | null) => {
    setUser(nextUser);
    setToken(nextToken);
    if (nextUser && nextToken) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
      localStorage.setItem('token', nextToken);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('token');
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    persist(data.user, data.token);
  };

  const logout = () => persist(null, null);

  const value = useMemo(() => ({ user, token, login, logout, loading }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
