import Link from 'next/link'
import { ticketsPath } from '@/paths'

export default function Home() {
  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to the Road to Next.js</h1>
        <p className="text-lg">
          This is a basic setup for a Next.js application with TypeScript and Tailwind CSS.
        </p>
      </div>
      <div className="flex flex-1  flex-col items-center">
        <Link href={ticketsPath()} className="underline text-teal-500 font-semibold">
          Go to Tickets
        </Link>
      </div>
    </div>
  )
}
