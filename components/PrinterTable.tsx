"use client"

import { useState, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { FiCode, FiSearch, FiDownload } from 'react-icons/fi'
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function PrinterTable({
  initialData,
  tableName = "printer"
}: {
  initialData: any[]
  tableName?: string
}) {
  const [data] = useState(initialData)
  const [qrItem, setQrItem] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQrItem(null)
    }

    if (qrItem) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [qrItem])

  const show = (v: any) =>
    v === null || v === undefined || v === ""
      ? <span className="na">N/A</span>
      : v

  const downloadQR = () => {
    const qrCanvas = document.getElementById("qr-canvas") as HTMLCanvasElement
    if (!qrCanvas || !qrItem) return

    const paddingTop = 35
    const paddingBottom = 25

    const newCanvas = document.createElement("canvas")
    const ctx = newCanvas.getContext("2d")

    newCanvas.width = qrCanvas.width
    newCanvas.height = qrCanvas.height + paddingTop + paddingBottom

    ctx!.fillStyle = "#ffffff"
    ctx!.fillRect(0, 0, newCanvas.width, newCanvas.height)

    ctx!.fillStyle = "#000"
    ctx!.font = "bold 18px Arial"
    ctx!.textAlign = "center"
    ctx!.fillText("PRINTER ASSET", newCanvas.width / 2, 35)

    ctx!.drawImage(qrCanvas, 0, paddingTop)

    ctx!.font = "bold 20px Arial"
    ctx!.fillText(
      qrItem.asset_code,
      newCanvas.width / 2,
      paddingTop + qrCanvas.height + 10
    )

    const link = document.createElement("a")
    link.download = `QR-${qrItem.asset_code}.png`
    link.href = newCanvas.toDataURL("image/png")
    link.click()
  }

  return (
    <>
      <motion.div
        className="table-wrapper"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
                key={item.asset_code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
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
                      router.push(`/printer/detail?code=${item.asset_code}`)
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="qr-close"
                onClick={() => setQrItem(null)}
              >
                 <span>X</span>
              </button>

              <h3 className="qr-title">
                QR Printer {qrItem.asset_code}
              </h3>

              <QRCodeCanvas
                id="qr-canvas"
                value={`${process.env.NEXT_PUBLIC_SITE_URL}/printer/detail?code=${qrItem.asset_code}`}
                size={250}
                level="H"
                includeMargin
              />

              <div className="qr-action">
                <button
                  onClick={downloadQR}
                  className="qr-download"
                >
                  <span>Download</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}