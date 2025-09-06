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
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { getFirebaseAuth } from '@/lib/firebase/client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be between 6 and 100 characters long' })
    .max(100, { message: 'Password must be between 6 and 100 characters long' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard/overview';
  const [loading, startTransition] = useTransition();
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

        toast.success('Signed in successfully');
        router.replace(redirectUrl);
      } catch (err) {
        console.error(err);
        toast.error('Sign-in failed');
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email...'
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password...'
                    disabled={loading}
                    {...field}
                  />
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
            Login
          </Button>
        </form>
      </Form>
      {/* Social buttons rendered outside in sign-in view */}
    </>
  );
}
