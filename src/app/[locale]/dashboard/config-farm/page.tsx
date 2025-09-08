import { useTranslations } from 'next-intl';
import { CirclePlusIcon, Trash2Icon, PencilIcon } from 'lucide-react';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';

const FarmSetupPage = () => {
  const t = useTranslations('farmSetup');
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {t('configFarm')}
          </h2>
        </div>

        <div className='bg-card text-card-foreground rounded-lg border shadow-sm'>
          <div className='flex flex-row items-center justify-between space-y-1.5 p-6'>
            <div className='flex flex-col space-y-0.5'>
              <h3 className='text-lg leading-none font-semibold tracking-tight'>
                {t('areaManagement')}
              </h3>
              <p className='text-muted-foreground text-sm'>
                {t('areaManagementDescription')}
              </p>
            </div>
            <button className='bg-primary text-primary-foreground hover:bg-primary/90 ring-offset-background focus:ring-ring inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
              <CirclePlusIcon className='mr-2 h-4 w-4' />
              <span>{t('addArea')}</span>
            </button>
          </div>

          <div className='p-6 pt-0'>
            <div className='relative w-full overflow-auto'>
              <table className='w-full caption-bottom text-sm'>
                <thead className='[&_tr]:border-b'>
                  <tr>
                    <th className='text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0'>
                      {t('areaName')}
                    </th>
                    <th className='text-muted-foreground h-12 px-4 text-left align-middle font-medium'>
                      {t('areaNumber')}
                    </th>
                    <th className='text-muted-foreground h-12 px-4 text-left align-middle font-medium'>
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className='[&_tr:last-child]:border-0'>
                  <tr className='hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors'>
                    <td className='p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0'>
                      Greenhouse 1
                    </td>
                    <td className='p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0'>
                      1
                    </td>
                    <td className='p-4 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Button variant='ghost' size='sm'>
                        <PencilIcon className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-red-600'
                      >
                        <Trash2Icon className='h-4 w-4' />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default FarmSetupPage;
