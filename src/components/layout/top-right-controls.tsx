import { LanguageSwitcher } from '@/components/language-switcher';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import { ThemeSelector } from '@/components/theme-selector';

export function TopRightControls() {
  return (
    <div className='absolute top-4 right-4 z-50 flex items-center gap-2'>
      <LanguageSwitcher />
      <ModeToggle />
      <ThemeSelector />
    </div>
  );
}
