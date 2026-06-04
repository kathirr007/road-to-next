import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { Suspense } from 'react'
// import { ErrorBoundary } from 'react-error-boundary'
import Error from '@/app/tickets/error'
import CardCompact from '@/components/CardCompact'
import { Heading } from '@/components/Heading'
import Spinner from '@/components/Spinner'
import { Pagination } from '@/components/ui/pagination'
import TicketsList from '@/features/ticket/components/TicketsList'
import TicketUpsertForm from '@/features/ticket/components/TicketUpsertForm'
import { getTickets } from '@/features/ticket/queries/get-tickets'

// export const dynamic = 'force-dynamic' // Force the page to behave as dynamic rendering page

// export const revalidate = 0 // ISR (Incremental Static Regeneration)

async function TicketsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[]>> }) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const { meta } = await getTickets({ page: currentPage, limit: 5 })

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets list page" description="All your tickets at one place. Click on a ticket to view its details." />

      <CardCompact title="Create ticket" description="A new ticket will be created" content={<TicketUpsertForm />} className="w-full max-w-[420px] justify-center self-center" />

      <ErrorBoundary errorComponent={Error}>
        <Suspense fallback={<Spinner />}>
          <div className="animate-in fade-in animate-slide-in-from-right-8 duration-300">
            <TicketsList currentPage={currentPage} searchParams={params} />
          </div>
        </Suspense>
      </ErrorBoundary>

      <div className="flex justify-center mt-4">
        <Pagination currentPage={currentPage} totalPages={meta.totalPages} searchParams={params} />
      </div>
    </div>
  )
}

export default TicketsPage
