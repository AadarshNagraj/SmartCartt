"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SessionModel, SessionStatus } from '@/models/session';
import { useCommerce } from './CommerceProvider';

interface AuthContextType {
  session: SessionModel | null;
  status: SessionStatus;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { sessionRepository } = useCommerce();
  const [session, setSession] = useState<SessionModel | null>(null);
  const [status, setStatus] = useState<SessionStatus>('refreshing'); // Start in refreshing state while checking local storage
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const initSession = async () => {
      try {
        const currentSession = await sessionRepository.getSession();
        if (mounted) {
          setSession(currentSession.status === 'authenticated' ? currentSession : null);
          setStatus(currentSession.status);
          setIsLoading(false);
        }
      } catch (_error) {
        if (mounted) {
          setStatus('guest');
          setIsLoading(false);
        }
      }
    };

    initSession();
    return () => { mounted = false; };
  }, [sessionRepository]);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const newSession = await sessionRepository.login(email, password);
      setSession(newSession);
      setStatus('authenticated');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await sessionRepository.logout();
      setSession(null);
      setStatus('guest');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, status, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return context;
}
