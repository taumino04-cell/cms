'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { navItems } from '@/constants/data';
import { useSession, signOut } from 'next-auth/react';
import {
  IconChevronRight,
  IconChevronsDown,
  IconLogout,
  IconUserCircle
} from '@tabler/icons-react';
import Link from 'next/link';
import * as React from 'react';
import { Icons } from '../icons';
// import { OrgSwitcher } from '../org-switcher';
import { Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations('common');
  const searchParams = useSearchParams();

  const setLocale = (locale: 'en' | 'vi') => {
    try {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
      // Update URL new locale
      const newPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      router.replace(newPath, { locale });
    } catch (e) {
      // no-op
    }
  };

  const onLogout = React.useCallback(() => {
    signOut({ callbackUrl: '/auth/sign-in' });
  }, [router]);

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <div className='flex flex-col gap-2 pt-2 pb-3'>
          <div className='flex items-center gap-2 overflow-hidden'>
            <div className='text-primary flex aspect-square size-8 items-center justify-center rounded-lg'>
              <Leaf className='size-4' />
            </div>
            <div className='flex flex-col gap-0.5 leading-none'>
              <span className='truncate font-semibold'>{t('appName')}</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={t(item.title)}
                        isActive={pathname === item.url}
                        className='pe-0'
                        asChild
                        slot='div'
                      >
                        <div>
                          <Link
                            href={item.url}
                            className='flex flex-1 items-center gap-2 text-sm [&>svg]:size-4 [&>svg]:shrink-0'
                          >
                            {item.icon && <Icon />}
                            <span className='truncate'>{t(item.title)}</span>
                          </Link>
                          <Button variant={'ghost'} className='rounded-md'>
                            <IconChevronRight className='rotate-[-90deg] transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                          </Button>
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const IconSub = subItem.icon
                            ? Icons[subItem.icon]
                            : Icons.logo;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  {subItem.icon && <IconSub />}
                                  <span>{t(subItem.title)}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={t(item.title)}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{t(item.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  {session?.user && (
                    <UserAvatarProfile
                      className='h-8 w-8 rounded-lg'
                      showInfo
                      user={{
                        imageUrl: (session.user as any).image || undefined,
                        fullName: session.user.name || null,
                        emailAddresses: [
                          { emailAddress: session.user.email || '' }
                        ]
                      }}
                    />
                  )}
                  <IconChevronsDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='px-1 py-1.5'>
                    {session?.user && (
                      <UserAvatarProfile
                        className='h-8 w-8 rounded-lg'
                        showInfo
                        user={{
                          imageUrl: (session.user as any).image || undefined,
                          fullName: session.user.name || null,
                          emailAddresses: [
                            { emailAddress: session.user.email || '' }
                          ]
                        }}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push('/dashboard/profile')}
                  >
                    <IconUserCircle className='mr-2 h-4 w-4' />
                    {t('profile')}
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>
                    <IconBell className='mr-2 h-4 w-4' />
                    Notifications
                  </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setLocale('en')}>
                    {t('english')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocale('vi')}>
                    {t('vietnamese')}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <IconLogout className='mr-2 h-4 w-4' />
                  {t('signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
