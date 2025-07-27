import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { HeaderNav } from '@/components/HeaderNav'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import './globals.css'

const geistSans = localFont({
  src: '../fonts/Geist-Geist_Mono.woff2',
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Road to Next.js',
  description: 'My Road to Next.js application',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentYear = new Date().getFullYear()

  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.className} antialiased`}
      >
        <ThemeProvider>
          <HeaderNav />
          <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">
            {children}
          </main>

          <footer className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 bottom-0 z-20 bg-background/95 backdrop-blur w-full py-2.5 px-5 text-center text-gray-500 text-sm border-t">
            <p className="text-center">
              ©&nbsp;
              {currentYear}
              {' '}
              The Road to Next.js
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
