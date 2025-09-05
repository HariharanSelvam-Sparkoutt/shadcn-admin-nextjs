"use client"
import { useEffect, useState } from 'react'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { roles } from '../data/data'
import { type User } from '../data/schema'
import { DataTableBulkActions } from './data-table-bulk-actions'
import { usersColumns as columns } from './users-columns'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className: string
  }
}

type DataTableProps = {
  data: User[]
  search: Record<string, string>
  navigate: NavigateFn
}

export function UsersTable({ data, search, navigate }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const {
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search,
    navigate,
    pagination: { defaultPage: 0, defaultPageSize: 10 },
    globalFilter: { enabled: false },
    columnFilters: [
      { columnId: 'username', searchKey: 'username', type: 'string' },
      { columnId: 'status', searchKey: 'status', type: 'array' },
      { columnId: 'role', searchKey: 'role', type: 'array' },
    ],
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    enableRowSelection: true,
    onPaginationChange: (updater) => {
      onPaginationChange(updater);
    },
    onColumnFiltersChange: (updater) => {
      onColumnFiltersChange(updater);
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  // Sync URL changes to table pagination state
  useEffect(() => {
    const pageIndex = search.page ? parseInt(search.page) - 1 : 0;
    const pageSize = search.pageSize ? parseInt(search.pageSize) : 10;
    
    if (table.getState().pagination.pageIndex !== pageIndex || 
        table.getState().pagination.pageSize !== pageSize) {
      table.setPagination({
        pageIndex,
        pageSize,
      });
    }
  }, [search.page, search.pageSize, table]);

  // Sync URL changes to table filter state
  useEffect(() => {
    const newFilters: typeof columnFilters = [];
    
    // Sync username filter
    if (search.username) {
      newFilters.push({
        id: 'username',
        value: search.username,
      });
    }
    
    // Sync status filter (handle both single and array values)
    if (search.status) {
      const statusValues = typeof search.status === 'string' 
        ? search.status.split(',') 
        : Array.isArray(search.status) 
          ? search.status 
          : [search.status];
      newFilters.push({
        id: 'status',
        value: statusValues,
      });
    }
    
    // Sync role filter (handle both single and array values)
    if (search.role) {
      const roleValues = typeof search.role === 'string' 
        ? search.role.split(',') 
        : Array.isArray(search.role) 
          ? search.role 
          : [search.role];
      newFilters.push({
        id: 'role',
        value: roleValues,
      });
    }
    
    // Only update if filters are different
    const currentFilters = table.getState().columnFilters;
    if (JSON.stringify(currentFilters) !== JSON.stringify(newFilters)) {
      table.setColumnFilters(newFilters);
    }
  }, [search.username, search.status, search.role, table]);

  // Ensure page is in valid range
  useEffect(() => {
    ensurePageInRange(table.getPageCount());
  }, [table.getPageCount(), ensurePageInRange]);

  return (
    <div className='space-y-4 max-sm:has-[div[role="toolbar"]]:mb-16'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter users...'
        searchKey='username'
        filters={[
          {
            columnId: 'status',
            title: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Invited', value: 'invited' },
              { label: 'Suspended', value: 'suspended' },
            ],
          },
          {
            columnId: 'role',
            title: 'Role',
            options: roles.map((role) => ({ ...role })),
          },
        ]}
      />
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        header.column.columnDef.meta?.className ?? ''
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                  className='group/row'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        cell.column.columnDef.meta?.className ?? ''
                      )}
                    >
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
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} navigate={navigate} />
      <DataTableBulkActions table={table} />
    </div>
  )
}