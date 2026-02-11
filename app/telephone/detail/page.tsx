'use client'

import { Suspense } from 'react'
import TelephoneDetailContent from './TelephoneDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TelephoneDetailContent />
    </Suspense>
  )
}
