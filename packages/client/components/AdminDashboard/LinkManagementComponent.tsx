'use client';

import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getURLTable } from '@/actions/analytics-actions';

interface URLTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  pageLimit: number;
}

export function LinkManagementComponent<TData, TValue>({
  columns,
  data,
  page,
  pageLimit,
}: URLTableProps<TData, TValue>) {
  const [urlData, setUrlData] = useState<TData[]>(
    data != undefined ? data : []
  );
  const [pageNum, setPageNum] = useState(page);
  const [nextPageValue, setNextPageValue] = useState(
    data != undefined ? data.length > pageLimit : false
  );

  const handleChangePage = async (mode: string) => {
    let newPageNum = pageNum;
    if (mode == 'prev') {
      newPageNum--;
    } else if (mode == 'next') {
      newPageNum++;
    }
    const tableData = await getURLTable(
      'date',
      'desc',
      newPageNum.toString(),
      'none'
    );

    setPageNum(tableData.page);
    setNextPageValue(
      tableData.data != undefined ? tableData.data.length > pageLimit : false
    );
    setUrlData(tableData.data != undefined ? tableData.data : []);
  };
  const table = useReactTable({
    data: urlData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageLimit,
      },
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <Input placeholder="Filter Short URL..." className="max-w-sm" />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChangePage('prev')}
          disabled={pageNum == 1 || pageNum == undefined}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChangePage('next')}
          disabled={!nextPageValue}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
