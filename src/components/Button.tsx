import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
}

export default function Button({ children, ...restProps }: ButtonProps) {
  return (
    <button {...restProps} type={(restProps as any).type || 'button'} className="underline text-teal-500 font-semibold">
      {children}
    </button>
  )
}
