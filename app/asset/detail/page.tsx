'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AssetDetail() {
  const searchParams = useSearchParams()
  const idParam = searchParams.get('id')
  const id = Number(idParam)

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!idParam || Number.isNaN(id)) return

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('assettuci')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setData(data)
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
      <p>Qty: {data.quantity} {data.unit}</p>
      <p>Serial: {data.serial_number}</p>
      <p>Location: {data.location}</p>
    </div>
  )
}
