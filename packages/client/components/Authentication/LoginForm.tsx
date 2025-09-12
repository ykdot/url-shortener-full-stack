'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { login } from '@/actions/auth-action';
// import { UserContext } from '@/store/user-context';

enum Version {
  ADMIN_LOGIN,
  LOGIN,
  SIGNUP,
}

interface LoginFormProps {
  version: Version;
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const LoginForm: FC<LoginFormProps> = ({ version }) => {
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
  async function onUserSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(process.env.NEXT_PUBLIC_SERVER_API_URL);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        // Throw an error with the message from the server to be caught below.
        throw new Error(data.message || 'An error occurred');
      }
      // store the token somewhere in the frontend
      // redirect to 'main' page if successful login
      // userCtx.login(data[0], data[1], data[2]);
      push(`/user/${data.username}`);
    } catch (error: unknown) {
      // error.response == 401
      if (error instanceof Error) {
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

  async function onAdminSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        // Throw an error with the message from the server to be caught below.
        throw new Error(data.message || 'An error occurred');
      }
      // store the token somewhere in the frontend
      // redirect to 'main' page if successful login
      // userCtx.login(data[0], data[1], data[2]);
      push(`/dashboard`);
    } catch (error: unknown) {
      // error.response == 401
      if (error instanceof Error) {
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

  let onSubmit;
  if (version == Version.ADMIN_LOGIN) {
    onSubmit = onAdminSubmit;
  } else {
    onSubmit = onUserSubmit;
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
};

export default LoginForm;
