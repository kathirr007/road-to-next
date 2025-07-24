import { ThemeProvider as BaseThemeProvider } from 'next-themes'
import React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <BaseThemeProvider attribute="class" enableSystem defaultTheme="system">
      {children}
    </BaseThemeProvider>
  )
}

export { ThemeProvider }
