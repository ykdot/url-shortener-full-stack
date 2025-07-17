'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { login } from '@/actions/auth-action';
// import { UserContext } from '@/store/user-context';
import styles from './Form.module.css';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { push } = useRouter();

  // const userCtx = useContext(UserContext);
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.

    try {
      // const data = await login(values);
      // userCtx.login(data[0], data[1], data[2]);
      push('/');
    } catch (error: any) {
      if (error.response == 403) {
        form.setError('username', {
          type: 'manual',
          message: 'Wrong username or password',
        });
        form.setError('password', {
          type: 'manual',
          message: 'Wrong username or password',
        });
      } else {
        form.setError('username', {
          type: 'manual',
          message: 'Wrong username or password',
        });
        form.setError('password', {
          type: 'manual',
          message: 'Wrong username or password',
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Log In</Button>
      </form>
    </Form>
  );
}
