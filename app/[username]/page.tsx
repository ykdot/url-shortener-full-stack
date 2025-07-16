import type { Metadata } from 'next';
import Link from 'next/link';
import URLForm from '@/components/URLForm/URLForm';
import styles from './page.module.css';
import MainHeader from '@/components/MainHeader/MainHeader';
import { URLTable } from '@/components/URLTable/URLTable';
import { columns, URL_Data } from '@/components/URLTable/columns';

export const metadata: Metadata = {
  title: 'Homepage',
};

async function getData(): Promise<URL_Data[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      new_link: 'https://ui.shadcn.com/docs/components',
      original_link: 'https://ui.shadcn.com/docs/components',
      date: '7/12/25',
    },
    {
      id: '489e1d42',
      new_link: 'https://ui.shadcn.com/docs/components/data-table',
      original_link: 'https://ui.shadcn.com/docs/components/data-table',
      date: '7/13/25',
    },
  ];
}

export default async function UserPage() {
  const data = await getData();
  return (
    <>
      <MainHeader />
      <div className={styles['container']}>
        <URLForm />
        <URLTable columns={columns} data={data} />
      </div>
    </>
  );
}
