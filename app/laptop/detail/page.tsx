'use client'

import { Suspense } from 'react'
import LaptopDetailContent from './LaptopDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LaptopDetailContent />
    </Suspense>
  )
}
