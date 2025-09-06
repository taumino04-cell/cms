'use client';
import { useFirebaseAuth } from '@/components/layout/firebase-auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileViewPage() {
  const { user } = useFirebaseAuth();
  if (!user) return null;
  const initials = (user.displayName || user.email || 'NA')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className='flex w-full flex-col gap-6 p-4'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold'>
            {user.displayName || 'User'}
          </span>
          <span className='text-muted-foreground text-sm'>{user.email}</span>
        </div>
      </div>
      <div className='text-muted-foreground text-sm'>
        UID: <code className='text-foreground'>{user.uid}</code>
      </div>
    </div>
  );
}
