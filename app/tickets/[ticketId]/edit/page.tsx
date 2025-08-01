import { notFound } from 'next/navigation'
import CardCompact from '@/components/CardCompact'
import TicketUpsertForm from '@/features/ticket/components/TicketUpsertForm'
import { getTicket } from '@/features/ticket/queries/get-ticket'

interface TicketEditPageProps {
  params: Promise<{
    ticketId: string
  }>
}

async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params
  const ticket = await getTicket(ticketId)

  if (!ticket) {
    notFound()
  }

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact title="Edit Ticket" description="Edit an existing ticket" className="w-full max-w-[420px]  animate-fade-in-from-top" content={<TicketUpsertForm ticket={ticket} />} />
    </div>
  )
}

export default TicketEditPage
