import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signInWithCustomToken, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authService } from '../services/api';

interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  admin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          localStorage.setItem('firebase_token', token);
          
          const userData = await authService.getProfile();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('firebase_token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await authService.register({
        user_name: username,
        user_email: email,
        password,
      });

      await signInWithCustomToken(auth, response.customToken);
      
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Erro ao criar conta');
    }
  };

  const login = async (email: string, password: string) => {
    try {

      const response = await authService.login({
        user_email: email,
        password,
      });

      await signInWithCustomToken(auth, response.customToken);
      
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('firebase_token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}