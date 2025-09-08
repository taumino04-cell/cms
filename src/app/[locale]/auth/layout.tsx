import { LanguageSwitcher } from '@/components/language-switcher';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import { ThemeSelector } from '@/components/theme-selector';

// This layout will be used for the authentication pages
export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-background relative min-h-screen'>
      <div className='absolute top-4 right-4 z-50 flex items-center gap-2'>
        <LanguageSwitcher />
        <ModeToggle />
        <ThemeSelector />
      </div>
      <div className='w-full'>{children}</div>
    </div>
  );
}
