"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

type CCTV = {
  asset_code: string
  asset_name: string
  category: string
  location: string
  brand: string
  serial_number: string
  purchase_date: string
  status: string
}

export default function CCTVDetailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')

  const [data, setData] = useState<CCTV | null>(null)
  const [loading, setLoading] = useState(true)

  const show = (v: any) =>
    v === null || v === undefined || v === ''
      ? 'N/A'
      : v

  const getStatusClass = (status: string | null) => {
    if (!status) return 'bad'

    const s = status.toLowerCase()

    if (
      s === 'good' ||
      s === 'active' ||
      s === 'available' ||
      s === 'all good'
    ) {
      return 'good'
    }

    return 'bad'
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!code) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('cctv')
        .select('*')
        .eq('asset_code', code)
        .single()

      if (!error && data) setData(data)
      setLoading(false)
    }

    fetchData()
  }, [code])

  if (!code) return <div>ID tidak ditemukan</div>

  if (loading) {
    return (
      <div className="main-container">
        <div className="content">Loading...</div>
      </div>
    )
  }

  if (!data) return <div>Data tidak ditemukan</div>

  return (
    <div className="main-container">
      <div className="detail-wrapper">

        <motion.button
          className="back-btn"
          onClick={() => router.push('/cctv')}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft />
          Back
        </motion.button>

        <motion.div
          className="content detail-card"
          key={data.asset_code}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.h1
            className="title-gradient-gold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {show(data.asset_name)}
          </motion.h1>

          <motion.div
            className="detail-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div>Asset Code</div><div>:</div><div>{show(data.asset_code)}</div>
            <div>Category</div><div>:</div><div>{show(data.category)}</div>
            <div>Location</div><div>:</div><div>{show(data.location)}</div>
            <div>Brand</div><div>:</div><div>{show(data.brand)}</div>
            <div>Serial Number</div><div>:</div><div>{show(data.serial_number)}</div>
            <div>Purchase Date</div><div>:</div><div>{show(data.purchase_date)}</div>
            <div>Status</div><div>:</div>
            <div>
              <span className={`status-badge ${getStatusClass(data.status)}`}>
                {show(data.status)}
              </span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </div>
  )
}
