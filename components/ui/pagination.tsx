import { LucideChevronLeft, LucideChevronRight, LucideChevronsLeft, LucideChevronsRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ticketsPath } from '@/paths'

interface PaginationProps {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | string[]>
}

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1)
    return null

  const basePath = ticketsPath()

  const createUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    const p = Math.max(1, Math.min(totalPages, page))
    if (p > 1) {
      params.set('page', p.toString())
    }
    else {
      params.delete('page')
    }
    return `${basePath}?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 mt-4">
      <Button variant="outline" size="icon" asChild disabled={currentPage === 1} className="transition-transform hover:scale-105 active:scale-95">
        <Link href={createUrl(1)}>
          <LucideChevronsLeft className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild disabled={currentPage === 1} className="transition-transform hover:scale-105 active:scale-95">
        <Link href={createUrl(currentPage - 1)}>
          <LucideChevronLeft className="h-4 w-4" />
        </Link>
      </Button>
      <span className="px-3 py-2 text-sm font-medium transition-colors duration-300">
        Page
        {' '}
        {currentPage}
        {' '}
        of
        {' '}
        {totalPages}
      </span>
      <Button variant="outline" size="icon" asChild disabled={currentPage === totalPages} className="transition-transform hover:scale-105 active:scale-95">
        <Link href={createUrl(currentPage + 1)}>
          <LucideChevronRight className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild disabled={currentPage === totalPages} className="transition-transform hover:scale-105 active:scale-95">
        <Link href={createUrl(totalPages)}>
          <LucideChevronsRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
