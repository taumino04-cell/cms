'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RequireAuth({
  children
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === 'unauthenticated') {
      const redirect_url =
        typeof window !== 'undefined'
          ? window.location.pathname + window.location.search
          : '/dashboard/overview';
      router.replace(
        `/auth/sign-in?redirect_url=${encodeURIComponent(redirect_url)}`
      );
    }
  }, [status, router, searchParams]);

  if (status === 'loading') return null;
  if (status === 'unauthenticated') return null;
  return <>{children}</>;
}
