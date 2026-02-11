'use client'

import { Suspense } from 'react'
import AssetDetailContent from './AssetDetailContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssetDetailContent />
    </Suspense>
  )
}
