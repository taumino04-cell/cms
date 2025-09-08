'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { getFirebaseAuth } from '@/lib/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';

export default function UserAuthForm() {
  const t = useTranslations('auth');
  const formSchema = z.object({
    email: z.string().email({ message: t('emailInvalid') }),
    password: z.string().min(1, { message: t('passwordRequired') })
  });

  type UserFormValue = z.infer<typeof formSchema>;

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard/overview';
  const [loading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues = { email: '', password: '' };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    const auth = getFirebaseAuth();
    startTransition(async () => {
      try {
        // Try sign-in; if user doesn’t exist, create
        // try {
        //   await signInWithEmailAndPassword(auth, data.email, data.password);
        // } catch (e) {
        //   await createUserWithEmailAndPassword(auth, data.email, data.password);
        // }
        await signInWithEmailAndPassword(auth, data.email, data.password);

        toast.success(t('loginSuccess'));
        router.replace(redirectUrl);
      } catch (err) {
        console.error(err);
        toast.error(t('loginFailed'));
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder={t('enterEmail')}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('enterPassword')}
                      disabled={loading}
                      autoComplete='current-password'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={loading}
                      className='text-muted-foreground hover:text-foreground focus:ring-ring absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 focus:ring-2 focus:outline-none'
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className='mt-2 ml-auto w-full'
            type='submit'
          >
            {t('login')}
          </Button>
        </form>
      </Form>
    </>
  );
}
