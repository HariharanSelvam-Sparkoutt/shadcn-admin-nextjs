import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'
import { cn, getPageNumbers } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { NavigateFn } from '@/hooks/use-table-url-state'
import { useEffect, useState } from 'react'

type DataTablePaginationProps<TData> = {
  table: Table<TData>
  navigate: NavigateFn
}

export function DataTablePagination<TData>({
  table,
  navigate,
}: DataTablePaginationProps<TData>) {
  const [currentPageSize, setCurrentPageSize] = useState(table.getState().pagination.pageSize);
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  // Sync page size from table state
  useEffect(() => {
    setCurrentPageSize(table.getState().pagination.pageSize);
  }, [table.getState().pagination.pageSize]);

  const handlePageSizeChange = (value: string) => {
    const pageSize = Number(value);
    setCurrentPageSize(pageSize);
    
    // Update URL
    navigate({
      search: (prev) => ({ 
        ...prev, 
        pageSize: `${pageSize}`,
        page: '1' // Reset to first page when changing page size
      }),
      replace: true
    });
    
    // Update table state immediately
    table.setPageSize(pageSize);
    table.setPageIndex(0);
  }

  const handlePageChange = (pageNumber: number) => {
    // Update URL
    navigate({
      search: (prev) => ({ ...prev, page: `${pageNumber}` }),
      replace: true
    });
    
    // Update table state immediately
    table.setPageIndex(pageNumber - 1);
  }

  return (
    <div className={cn(
      'flex items-center justify-between overflow-clip px-2',
      '@max-2xl/main:flex-col-reverse @max-2xl/main:gap-4'
    )}>
      <div className='flex w-full items-center justify-between'>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium @2xl/main:hidden'>
          Page {currentPage} of {totalPages}
        </div>
        <div className='flex items-center gap-2 @max-2xl/main:flex-row-reverse'>
          <Select
            value={`${currentPageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={currentPageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
        </div>
      </div>

      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium @max-3xl/main:hidden'>
          Page {currentPage} of {totalPages}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='size-8 p-0 @max-md/main:hidden'
            onClick={() => handlePageChange(1)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>

          <Button
            variant='outline'
            className='size-8 p-0'
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>

          {pageNumbers.map((pageNumber, index) => (
            <div key={`${pageNumber}-${index}`} className='flex items-center'>
              {pageNumber === '...' ? (
                <span className='text-muted-foreground px-1 text-sm'>...</span>
              ) : (
                <Button
                  variant={currentPage === pageNumber ? 'default' : 'outline'}
                  className='size-8 p-0'
                  onClick={() => handlePageChange(pageNumber as number)}
                >
                  <span className='sr-only'>Go to page {pageNumber}</span>
                  {pageNumber}
                </Button>
              )}
            </div>
          ))}

          <Button
            variant='outline'
            className='size-8 p-0'
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>

          <Button
            variant='outline'
            className='size-8 p-0 @max-md/main:hidden'
            onClick={() => handlePageChange(totalPages)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}