'use client'

import { Suspense } from 'react'
import SmartTVDetailContent from './SmartTVDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SmartTVDetailContent />
    </Suspense>
  )
}
