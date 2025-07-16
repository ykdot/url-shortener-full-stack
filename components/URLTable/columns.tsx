'use client';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';

export type URL_Data = {
  id: string;
  new_link: string;
  original_link: string;
  date: string;
};

export const payments: URL_Data[] = [
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

export const columns: ColumnDef<URL_Data>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'new_link',
    header: 'New Link',
    cell: ({ row }) => {
      return (
        <Link href={row.original.new_link} target="_blank">
          {row.original.new_link}
        </Link>
      );
    },
  },
  {
    accessorKey: 'original_link',
    header: 'Original Link',
    cell: ({ row }) => {
      return (
        <Link href={row.original.original_link} target="_blank">
          {row.original.original_link}
        </Link>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <Button>Delete URL</Button>;
    },
  },
];
