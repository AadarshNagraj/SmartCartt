"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { status, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && status === 'guest') {
      router.replace('/login');
    }
  }, [status, isLoading, router]);

  if (isLoading || status === 'refreshing') {
    return (
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={32} style={{ color: 'var(--color-text-secondary)' }} />
      </div>
    );
  }

  if (status === 'guest') {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
