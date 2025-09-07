'use client';

import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/components/layout/firebase-auth-provider';
import { useTranslations } from 'next-intl';

export function UserNav() {
  const t = useTranslations('common');
  const { user, logout } = useFirebaseAuth();
  const router = useRouter();
  const onLogout = useCallback(() => {
    logout().then(() => router.push('/auth/sign-in'));
  }, [logout, router]);

  if (!user) return null;

  const avatarUser = {
    imageUrl: user.photoURL || undefined,
    fullName: user.displayName || null,
    emailAddresses: [{ emailAddress: user.email || '' }]
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <UserAvatarProfile user={avatarUser} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>
              {user.displayName}
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            {t('profile')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>{t('signOut')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
