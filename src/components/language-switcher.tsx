'use client';
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();

  const setLocale = (locale: 'en' | 'vi') => {
    try {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
      router.refresh();
    } catch (e) {
      // no-op
    }
  };

  return (
    <Select
      value={locale}
      onValueChange={(value: string) => {
        // Navigate to the same pathname but with the new locale
        setLocale(value as 'en' | 'vi');
      }}
    >
      <SelectTrigger className='w-[140px]'>
        <SelectValue placeholder={t('language')} />
      </SelectTrigger>
      <SelectContent align='end'>
        <SelectItem value='en'>{t('english')}</SelectItem>
        <SelectItem value='vi'>{t('vietnamese')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
