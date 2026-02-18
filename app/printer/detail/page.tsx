'use client'

import { Suspense } from 'react'
import PrinterDetailContent from './PrinterDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrinterDetailContent />
    </Suspense>
  )
}
