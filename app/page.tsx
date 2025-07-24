import Link from 'next/link'
import { Heading } from '@/components/Heading'
import { ticketsPath } from '@/paths'

export default function Home() {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading title="Welcome to the Road to Tickets" description="Your Home place to start your tickets." />
      <div className="flex flex-1  flex-col items-center">
        <Link href={ticketsPath()} className="underline text-teal-500 font-semibold">
          Go to Tickets
        </Link>
      </div>
    </div>
  )
}
