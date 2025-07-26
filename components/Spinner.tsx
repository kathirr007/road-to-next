import { LucideLoaderCircle } from 'lucide-react'
import React from 'react'

function Spinner() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center self-center">
      <LucideLoaderCircle className="h-12 w-12 animate-spin" />
    </div>
  )
}

export default Spinner
