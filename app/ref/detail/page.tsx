'use client'

import { Suspense } from 'react'
import RefDetailContent from './RefDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RefDetailContent />
    </Suspense>
  )
}