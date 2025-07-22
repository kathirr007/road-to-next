import Link from 'next/link'
import { ticketsPath } from '@/paths'

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to the Road to Next.js</h1>
      <p className="text-lg">
        This is a basic setup for a Next.js application with TypeScript and Tailwind CSS.
      </p>
      <div className="flex flex-col gap-4">
        <Link href="/about" className="underline text-teal-500 font-semibold">
          About
        </Link>
        <Link href={ticketsPath()} className="underline text-teal-500 font-semibold">
          Tickets
        </Link>
      </div>
    </>
  )
}
