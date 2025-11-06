import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signInWithCustomToken, signOut, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authService } from '../services/api';

interface User {
  user_id: number;
  username: string;
  full_name: string;
  user_email: string;
  admin: boolean;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
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

  const register = async (username: string, fullName: string, email: string, password: string) => {
    try {
      const response = await authService.register({
        username,
        full_name: fullName,
        user_email: email,
        password,
      });

      // Fazer login com o customToken para poder enviar email de verificação
      const userCredential = await signInWithCustomToken(auth, response.customToken);

      // Enviar email de verificação através do Firebase
      if (userCredential.user) {
        // Configurar o link de redirecionamento após verificação
        const actionCodeSettings = {
          url: window.location.origin, // Redireciona para a página inicial após verificar
        };
        await sendEmailVerification(userCredential.user, actionCodeSettings);
        console.log('Email de verificação enviado com sucesso!');
      }

      // Fazer logout - usuário precisa verificar email antes de usar a conta
      await signOut(auth);

      return response;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Erro ao criar conta');
    }
  };

  const login = async (identifier: string, password: string) => {
    try {

      const response = await authService.login({
        identifier,
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

  const requestPasswordReset = async (email: string) => {
    try {
      await authService.requestPasswordReset(email);
    } catch (error: any) {
      console.error('Password reset request error:', error);
      throw new Error(error.response?.data?.message || 'Erro ao solicitar redefinição de senha');
    }
  };

  const refreshUserProfile = async () => {
    try {
      const userData = await authService.getProfile();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, requestPasswordReset, refreshUserProfile }}>
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