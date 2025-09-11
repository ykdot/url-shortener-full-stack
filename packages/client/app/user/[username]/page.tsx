import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import URLForm from '@/components/URLForm/URLForm';
import styles from './page.module.css';
import MainHeader from '@/components/MainHeader/MainHeader';
import { URLTable } from '@/components/URLTable/URLTable';
import { columns, URL_Data } from '@/components/URLTable/columns';

export const metadata: Metadata = {
  title: 'Homepage',
};

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

async function checkUser(username: string) {
  const cookie = await cookies();
  const response = await fetch(
    'http://localhost:3001/api/users/get-user-info',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.toString(),
      },
      credentials: 'include',
    }
  );
  const data = await response.json();
  if (!response.ok || data.username != username) {
    redirect('/login');
  }
}

// this is a server side function, so need to use next/headers to access cookies from the client side
async function getData(): Promise<URL_Data[]> {
  const cookie = await cookies();
  const response = await fetch(
    'http://localhost:3001/api/users/get-user-urls',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.toString(),
      },
      credentials: 'include',
    }
  );
  const data = await response.json();
  return data.urls;
}

export default async function UserPage({ params }: PageProps) {
  const slug = await params;
  await checkUser(slug.username);
  const data = await getData();
  return (
    <>
      <MainHeader />
      <div className={styles['container']}>
        <p>Welcome {slug.username}!</p>
        <URLForm />
        <URLTable columns={columns} data={data} />
      </div>
    </>
  );
}
