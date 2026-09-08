import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import {
  formatAuthUser,
  signInWithGoogle as apiSignInWithGoogle,
  signInWithApple as apiSignInWithApple,
  signInWithEmail as apiSignInWithEmail,
  signUpWithEmail as apiSignUpWithEmail,
  signOutUser,
  onAuthChange,
  getAuthErrorMessage,
  updateUserPassword as apiUpdateUserPassword,
  reauthenticateUser as apiReauthenticateUser,
  updateUserProfile as apiUpdateUserProfile,
  type AuthUserData
} from '../../../services/auth/authService';

export type AuthActionType = 'google' | 'apple' | 'email' | 'logout' | null;

export interface AuthContextValue {
  user: AuthUserData | null;
  firebaseUser: User | null;
  loading: boolean;
  actionLoading: AuthActionType;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  reauthenticateUser: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<AuthUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<AuthActionType>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to Firebase auth state
    const unsubscribe = onAuthChange((currentUser) => {
      setFirebaseUser(currentUser);
      setUser(formatAuthUser(currentUser));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const signInWithGoogle = async () => {
    try {
      clearError();
      setActionLoading('google');
      await apiSignInWithGoogle();
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      setError(friendlyMsg);
      throw err;
    } finally {
      setActionLoading(null);
    }
  };

  const signInWithApple = async () => {
    try {
      clearError();
      setActionLoading('apple');
      await apiSignInWithApple();
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      setError(friendlyMsg);
      throw err;
    } finally {
      setActionLoading(null);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      clearError();
      setActionLoading('email');
      await apiSignInWithEmail(email, password);
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      setError(friendlyMsg);
      throw err;
    } finally {
      setActionLoading(null);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    try {
      clearError();
      setActionLoading('email');
      await apiSignUpWithEmail(email, password, displayName);
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      setError(friendlyMsg);
      throw err;
    } finally {
      setActionLoading(null);
    }
  };

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    try {
      clearError();
      setActionLoading('email'); // Just using email as generic loading state or add 'update' to AuthActionType
      await apiUpdateUserProfile(displayName, photoURL);
      // Update local state immediately
      if (firebaseUser) {
        // Create a shallow copy and update it to trigger re-renders
        const updatedFirebaseUser = { ...firebaseUser, displayName, photoURL } as User;
        setFirebaseUser(updatedFirebaseUser);
        setUser(formatAuthUser(updatedFirebaseUser));
      }
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      setError(friendlyMsg);
      throw err;
    } finally {
      setActionLoading(null);
    }
  };

  const updateUserPassword = async (newPassword: string) => {
    try {
      clearError();
      setActionLoading('email');
      await apiUpdateUserPassword(newPassword);
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      setError(friendlyMsg);
      throw err;
    } finally {
      setActionLoading(null);
    }
  };

  const reauthenticateUser = async (password: string) => {
    try {
      clearError();
      setActionLoading('email');
      await apiReauthenticateUser(password);
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      setError(friendlyMsg);
      throw err;
    } finally {
      setActionLoading(null);
    }
  };

  const logout = async () => {
    try {
      clearError();
      setActionLoading('logout');
      await signOutUser();
    } catch (err: any) {
      const friendlyMsg = getAuthErrorMessage(err);
      setError(friendlyMsg);
      throw err;
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        actionLoading,
        error,
        signInWithGoogle,
        signInWithApple,
        signInWithEmail,
        signUpWithEmail,
        updateUserProfile,
        updateUserPassword,
        reauthenticateUser,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
