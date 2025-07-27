/* eslint-disable no-console */
import { PrismaClient, TicketStatus } from '@prisma/client'

const prisma = new PrismaClient()

const tickets = [
  {
    title: 'Ticket 1',
    content: 'Description for ticket 1 - from database',
    status: TicketStatus.DONE,
  },
  {
    title: 'Ticket 2',
    content: 'Description for ticket 2 - from database',
    status: TicketStatus.IN_PROGRESS,
  },
  {
    title: 'Ticket 3',
    content: 'Description for ticket 3 - from database',
    status: TicketStatus.DONE,
  },
  {
    title: 'Ticket 4',
    content: 'Description for ticket 4 - from database',
    status: TicketStatus.OPEN,
  },
]

async function seed() {
  /* for (const ticket of tickets) {
    await prisma.ticket.create({
      data: ticket,
    })
  } */

  /* const promises = tickets.map((ticket) => {
    return prisma.ticket.create({
      data: ticket,
    })
  })

  await Promise.all(promises) */

  const t0 = performance.now()

  console.log('DB Seed started...')
  await prisma.ticket.deleteMany()

  await prisma.ticket.createMany({
    data: tickets,
  })
  const t1 = performance.now()

  console.log(`DB Seed completed in ${t1 - t0} milliseconds.`)
}

seed()
