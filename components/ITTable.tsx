"use client"

import { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { FiCode, FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function ITTable({
  initialData,
  tableName = 'it_equipment'
}: {
  initialData: any[]
  tableName?: string
}) {
  const [data, setData] = useState(initialData)
  const [qrItem, setQrItem] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQrItem(null)
    }

    if (qrItem) {
      window.addEventListener('keydown', handleEsc)
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [qrItem])

  const show = (v: any) =>
    v === null || v === undefined || v === ''
      ? <span className="na">N/A</span>
      : v

  return (
    <>
      <motion.div
        className="table-wrapper"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <table className="asset-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Asset Code</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Brand</th>
              <th>Serial Number</th>
              <th>Purchase Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <motion.tr
                key={item.id ?? item.asset_code ?? `row-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05
                }}
              >
                <td>{i + 1}</td>
                <td>{show(item.asset_code)}</td>
                <td>{show(item.asset_name)}</td>
                <td>{show(item.category)}</td>
                <td>{show(item.location)}</td>
                <td>{show(item.brand)}</td>
                <td>{show(item.serial_number)}</td>
                <td>{show(item.purchase_date)}</td>
                <td>{show(item.status)}</td>

                <td className="action-cell">
                  <button
                    className="icon-btn detail"
                    onClick={() =>
                      router.push(`/ittools/detail?code=${item.asset_code}`)
                    }
                  >
                    <FiSearch />
                  </button>

                  <button
                    className="icon-btn qr"
                    onClick={() => setQrItem(item)}
                  >
                    <FiCode />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <AnimatePresence>
        {qrItem && (
          <motion.div
            className="qr-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQrItem(null)}
          >
            <motion.div
              className="qr-box"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="qr-close"
                onClick={() => setQrItem(null)}
              >
                ✕
              </button>

              <h3>QR IT EQUIPMENT {qrItem.asset_code}</h3>

              <QRCodeCanvas
                value={`${process.env.NEXT_PUBLIC_SITE_URL}/ittools/detail?code=${qrItem.asset_code}`}
                size={200}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
