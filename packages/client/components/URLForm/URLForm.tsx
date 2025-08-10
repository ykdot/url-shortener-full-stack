'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './URLForm.module.css';
import { addURL } from '@/actions/url-actions';

const formSchema = z.object({
  url: z.string(),
});

function URLForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await addURL(values.url);
    if (response.status) {
      form.setValue('url', '');
      router.refresh();
    } else {
      alert('error with deleting url');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter URL" {...field} className="w-3xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add URL</Button>
      </form>
    </Form>
  );
}

export default URLForm;
