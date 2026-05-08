'use client'

import { Suspense } from 'react'
import EngToolDetailContent from './EngToolDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EngToolDetailContent />
    </Suspense>
  )
}
