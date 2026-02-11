"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

type SmartTV = {
  asset_code: string
  asset_name: string
  category: string
  location: string
  brand: string
  serial_number: string
  purchase_date: string
  status: string
}

export default function SmartTVDetailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')

  const [data, setData] = useState<SmartTV | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!code) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('smart_tv')
        .select('*')
        .eq('asset_code', code)
        .single()

      if (!error && data) setData(data)
      setLoading(false)
    }

    fetchData()
  }, [code])

  if (!code) return <div>Asset Code tidak ditemukan</div>

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
      <div style={{ maxWidth: "1100px", margin: "20px auto", padding: "0 30px" }}>

        <motion.button
  className="back-btn"
  onClick={() => router.push('/tv')}
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
          className="content"
          key={data.asset_code}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {data.asset_name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <p><strong>Asset Code:</strong> {data.asset_code}</p>
            <p><strong>Category:</strong> {data.category}</p>
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>Brand:</strong> {data.brand}</p>
            <p><strong>Serial Number:</strong> {data.serial_number}</p>
            <p><strong>Purchase Date:</strong> {data.purchase_date}</p>
            <p><strong>Status:</strong> {data.status}</p>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
