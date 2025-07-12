import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { URLForm } from '@/components/URLForm/URLForm';
import styles from './page.module.css';
import { Button } from '@/components/ui/button';
import MainHeader from '@/components/MainHeader/MainHeader';

export const metadata: Metadata = {
  title: 'Homepage',
};

export default function UserPage() {
  return (
    <div className={styles['container']}>
      <MainHeader />
      <URLForm />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>New Link</TableHead>
            <TableHead>Original Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>7/12/25</TableCell>
            <TableCell>
              <Link
                href="https://ui.shadcn.com/docs/components"
                target="_blank"
              >
                https://ui.shadcn.com/docs/components
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href="https://ui.shadcn.com/docs/components"
                target="_blank"
              >
                https://ui.shadcn.com/docs/components
              </Link>
            </TableCell>
            <TableCell>
              <Button>Delete URL</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7/12/25</TableCell>
            <TableCell>
              <Link
                href="https://ui.shadcn.com/docs/components"
                target="_blank"
              >
                https://ui.shadcn.com/docs/components
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href="https://ui.shadcn.com/docs/components"
                target="_blank"
              >
                https://ui.shadcn.com/docs/components
              </Link>
            </TableCell>
            <TableCell>
              <Button>Delete URL</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
