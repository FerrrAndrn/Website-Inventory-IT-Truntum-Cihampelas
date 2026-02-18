'use client'

import { Suspense } from 'react'
import ITToolsDetailContent from './ITToolsDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ITToolsDetailContent />
    </Suspense>
  )
}
