'use client'

import { Suspense } from 'react'
import FbDetailContent from './FbDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FbDetailContent />
    </Suspense>
  )
}
