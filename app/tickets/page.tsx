import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { Suspense } from 'react'
// import { ErrorBoundary } from 'react-error-boundary'
import Error from '@/app/tickets/error'
import { Heading } from '@/components/Heading'
import Spinner from '@/components/Spinner'
import TicketsList from '@/features/ticket/components/TicketsList'

async function ticketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">

      <Heading title="Tickets list page" description="All your tickets at one place. Click on a ticket to view its details." />

      <ErrorBoundary errorComponent={Error}>
        <Suspense fallback={<Spinner />}>
          <TicketsList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default ticketsPage
