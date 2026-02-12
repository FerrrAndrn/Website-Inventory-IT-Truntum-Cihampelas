'use client'

import { Suspense } from 'react'
import ComputerDetailContent from './ComputerDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComputerDetailContent />
    </Suspense>
  )
}
