'use client'

import { Suspense } from 'react'
import CCTVDetailContent from './CCTVDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CCTVDetailContent />
    </Suspense>
  )
}
