'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type Asset = {
  id: number
  product: string
  asset_num: string
  description: string
  quantity: number
  unit: string
  serial_number: string
  location: string
}

export default function AssetDetailContent() {
  const searchParams = useSearchParams()
  const idParam = searchParams.get('id')
  const id = Number(idParam)

  const [data, setData] = useState<Asset | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!idParam || Number.isNaN(id)) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('assettuci')
        .select('*')
        .eq('id', id)
        .single()

      if (!error && data) setData(data)
      setLoading(false)
    }

    fetchData()
  }, [idParam, id])

  if (!idParam) return <div>ID tidak ditemukan</div>
  if (Number.isNaN(id)) return <div>ID tidak valid</div>
  if (loading) return <div>Loading...</div>
  if (!data) return <div>Data tidak ditemukan</div>

  return (
    <div style={{ padding: 24 }}>
      <h1>{data.product}</h1>
      <p>Asset Number: {data.asset_num}</p>
      <p>Description: {data.description}</p>
      <p>
        Qty: {data.quantity} {data.unit}
      </p>
      <p>Serial: {data.serial_number}</p>
      <p>Location: {data.location}</p>
    </div>
  )
}
