'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { deleteURL } from '@/actions/url-actions';

export type Management_Data = {
  id: string;
  short_code: string;
  long_url: string;
  total_clicks: number;
  date: string;
};

// Example data
export const payments: Management_Data[] = [
  {
    id: '728ed52f',
    short_code: 'https://ui.shadcn.com/docs/components',
    total_clicks: 1,
    long_url: 'https://ui.shadcn.com/docs/components',
    date: '7/12/25',
  },
  {
    id: '489e1d42',
    short_code: 'https://ui.shadcn.com/docs/components/data-table',
    total_clicks: 1,
    long_url: 'https://ui.shadcn.com/docs/components/data-table',
    date: '7/13/25',
  },
];

function CellComponent({ short_code }: { short_code: string }) {
  const router = useRouter();
  async function deleteUserUrl(shortcode: string) {
    const response = await deleteURL(shortcode);
    if (response.status) {
      router.refresh();
    } else {
      alert('error with deleting url');
    }
  }

  return <Button onClick={() => deleteUserUrl(short_code)}>Delete URL</Button>;
}

export const columns: ColumnDef<Management_Data>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const jsDate = new Date(row.original.date);
      const formattedDate = jsDate.toLocaleDateString('en-US');
      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: 'short_code',
    header: 'Shortcode Link',
    cell: ({ row }) => {
      return (
        <Link href={row.original.short_code} target="_blank">
          {row.original.short_code}
        </Link>
      );
    },
  },
  {
    accessorKey: 'long_url',
    header: 'Original Link',
    cell: ({ row }) => {
      return (
        <Link href={row.original.long_url} target="_blank">
          {row.original.long_url}
        </Link>
      );
    },
  },
  {
    accessorKey: 'total_clicks',
    header: 'Total Clicks',
    cell: ({ row }) => {
      return (
        <p>{row.original.total_clicks}</p>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellComponent short_code={row.original.short_code} />,
  },
];
