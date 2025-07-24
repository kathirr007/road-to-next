import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const headers = new Headers(request.headers)
  headers.set('x-pathname', pathname)

  return NextResponse.next({ request: { headers } })
}
