'use client'

import { Suspense } from 'react'
import SDBDetailContent from './SDBDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SDBDetailContent />
    </Suspense>
  )
}
