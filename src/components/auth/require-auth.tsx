'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFirebaseAuth } from '@/components/layout/firebase-auth-provider';

export default function RequireAuth({
  children
}: {
  children: React.ReactNode;
}) {
  const { user } = useFirebaseAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user === null) {
      const redirect_url =
        typeof window !== 'undefined'
          ? window.location.pathname + window.location.search
          : '/dashboard/overview';
      router.replace(
        `/auth/sign-in?redirect_url=${encodeURIComponent(redirect_url)}`
      );
    }
  }, [user, router, searchParams]);

  if (user === undefined) return null; // loading
  if (user === null) return null;
  return <>{children}</>;
}
