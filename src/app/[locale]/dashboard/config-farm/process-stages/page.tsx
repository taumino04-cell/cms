import React, { use } from 'react';

import PageContainer from '@/components/layout/page-container';
import { useTranslations } from 'next-intl';

const ProcessStagesPage = () => {
  const t = useTranslations('farmSetup');
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {t('processStages')}
          </h2>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProcessStagesPage;
