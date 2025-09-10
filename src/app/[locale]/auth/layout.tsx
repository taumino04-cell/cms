import { TopRightControls } from '@/components/layout/top-right-controls';

// This layout will be used for the authentication pages
export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-background relative min-h-screen'>
      <TopRightControls />
      <div className='w-full'>{children}</div>
    </div>
  );
}
