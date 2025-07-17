'use client';

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
// import { add_bp } from '@/actions/bp_db';
import styles from './URLForm.module.css';

const formSchema = z.object({
  url: z.string(),
});

function URLForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    // const time = values.date.get('hour') + ':' + values.date.get('minute');
    console.log(values.url);
    // await add_bp(
    //   values.date.toDate().toISOString(),
    //   time,
    //   values.systolic,
    //   values.diastolic,
    //   values.meds,
    //   values.symptoms,
    //   values.notes
    // );
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
