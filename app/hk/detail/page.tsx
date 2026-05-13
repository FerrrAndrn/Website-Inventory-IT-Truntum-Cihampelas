'use client'

import { Suspense } from 'react'
import HkDetailContent from './HkDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HkDetailContent />
    </Suspense>
  )
}
