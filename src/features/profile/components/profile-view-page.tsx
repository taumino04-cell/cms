'use client';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileViewPage() {
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) return null;
  const initials = (user.name || user.email || 'NA').slice(0, 2).toUpperCase();
  return (
    <div className='flex w-full flex-col gap-6 p-4'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={(user as any).image || ''} alt={user.name || ''} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold'>{user.name || 'User'}</span>
          <span className='text-muted-foreground text-sm'>{user.email}</span>
        </div>
      </div>
    </div>
  );
}
