'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { QRCodeCanvas } from 'qrcode.react'
import { FiEdit, FiTrash2, FiCode, FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function AssetTable({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData)
  const [qrItem, setQrItem] = useState<any>(null)
  const router = useRouter()

  const show = (v: any) =>
    v === null || v === undefined || v === ''
      ? <span className="na">N/A</span>
      : v

  const formatServerDate = (iso?: string | null) =>
    iso ? iso.split('T')[0] : <span className="na">N/A</span>

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin mau hapus asset ini?')) return

    const { error } = await supabase
      .from('assettuci')
      .delete()
      .eq('id', id)

    if (!error) {
      setData(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <>
      <div className="table-wrapper">
        <table className="asset-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset Number</th>
              <th>Product</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Serial Number</th>
              <th>Location</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{show(item.asset_num)}</td>
                <td>{show(item.product)}</td>
                <td>{show(item.description)}</td>
                <td>{show(item.quantity)}</td>
                <td>{show(item.unit)}</td>
                <td>{show(item.serial_number)}</td>
                <td>{show(item.location)}</td>
                <td>{formatServerDate(item.created_at)}</td>

                <td className="action-cell">
                  {/* 🔥 DETAIL (QUERY STRING) */}
                  <button
                    className="icon-btn detail"
                    title="Detail"
                    onClick={() =>
                      router.push(`/asset/detail?id=${item.id}`)
                    }
                  >
                    <FiSearch />
                  </button>

                  <button className="icon-btn edit" title="Edit">
                    <FiEdit />
                  </button>

                  <button
                    className="icon-btn delete"
                    title="Delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FiTrash2 />
                  </button>

                  <button
                    className="icon-btn qr"
                    title="QR Code"
                    onClick={() => setQrItem(item)}
                  >
                    <FiCode />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {qrItem && (
        <div className="qr-modal">
          <div className="qr-box">
            <h3>QR Asset {qrItem.asset_num}</h3>
            <QRCodeCanvas
              value={`${window.location.origin}/asset/detail?id=${qrItem.id}`}
              size={200}
            />
            <button onClick={() => setQrItem(null)}>Tutup</button>
          </div>
        </div>
      )}
    </>
  )
}
