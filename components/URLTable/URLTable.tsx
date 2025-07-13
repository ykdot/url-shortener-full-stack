import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function URLTable() {
  return (
    <div>
      <Table className="">
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
