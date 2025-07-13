import type { Metadata } from 'next';
import Link from 'next/link';
import URLForm from '@/components/URLForm/URLForm';
import styles from './page.module.css';
import MainHeader from '@/components/MainHeader/MainHeader';
import URLTable from '@/components/URLTable/URLTable';

export const metadata: Metadata = {
  title: 'Homepage',
};

export default function UserPage() {
  return (
    <>
      <MainHeader />
      <div className={styles['container']}>
        <URLForm />
        <URLTable />
      </div>
    </>
  );
}
