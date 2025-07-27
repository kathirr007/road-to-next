import { notFound } from 'next/navigation'
import React from 'react'
import CardCompact from '@/components/CardCompact'
import TicketUpdateForm from '@/features/ticket/components/TicketUpdateForm'
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
      <CardCompact title="Edit Ticket" description="Edit an existing ticket" className="w-full max-w-[420px]  animate-fade-in-from-top" content={<TicketUpdateForm ticket={ticket} />} />
    </div>
  )
}

export default TicketEditPage
