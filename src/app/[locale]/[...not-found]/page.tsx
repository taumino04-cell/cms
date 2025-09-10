'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { TopRightControls } from '@/components/layout/top-right-controls';

export default function NotFound() {
  const t = useTranslations('common');
  const router = useRouter();

  return (
    <div className='bg-background relative min-h-screen'>
      <TopRightControls />
      <div className='absolute top-1/2 left-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center'>
        <span className='from-foreground bg-linear-to-b to-transparent bg-clip-text text-[10rem] leading-none font-extrabold text-transparent'>
          404
        </span>
        <h2 className='font-heading my-2 text-2xl font-bold'>
          {t('notFoundTitle')}
        </h2>
        <p>{t('notFoundMessage')}</p>
        <div className='mt-8 flex justify-center gap-2'>
          <Button onClick={() => router.back()} variant='default' size='lg'>
            {t('goBack')}
          </Button>
          <Button
            onClick={() => router.push('/dashboard')}
            variant='ghost'
            size='lg'
          >
            {t('backToHome')}
          </Button>
        </div>
      </div>
    </div>
  );
}
