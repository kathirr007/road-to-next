import { LucideLoaderCircle } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

interface SubmitButtonProps {
  label?: string
}

function SubmitButton({ label = 'Submit' }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="flex-1  cursor-pointer">
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}

export default SubmitButton
