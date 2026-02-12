'use client'

import './globals.css'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)

  return (
    <html lang="en">
      <body>

        <header className="header">
          <div className="header-left">
            <button
              onClick={() => setOpen(!open)}
              className="burger-btn"
            >
              ☰
            </button>

            <div className="header-text">
              <h1>ASSET INVENTORY</h1>
            </div>
          </div>

          <div className="header-logo">
            <Image
              src="/trwh.png"
              alt="Truntum Cihampelas"
              width={120}
              height={35}
              priority
            />
          </div>
        </header>

        <div className={`sidebar ${open ? 'sidebar-open' : ''}`}>
          <div className="sidebar-title">Menu</div>

          <nav className="sidebar-menu">
            <Link href="/" onClick={() => setOpen(false)}>
              Dashboard
            </Link>

            <div>
              <button
                type="button"
                className="inventory-btn"
                onClick={() => setInventoryOpen(!inventoryOpen)}
              >
                Inventory
                <span
                  style={{
                    marginLeft: "6px",
                    display: "inline-block",
                    transition: "transform 0.35s ease",
                    transform: inventoryOpen ? "rotate(90deg)" : "rotate(0deg)"
                  }}
                >
                  ▶
                </span>
              </button>

              <div className={`submenu ${inventoryOpen ? 'submenu-open' : ''}`}>
                <Link href="/laptop" onClick={() => setOpen(false)}>
                  Laptop
                </Link>

                <Link href="/tv" onClick={() => setOpen(false)}>
                  Smart TV
                </Link>

                <Link href="/telephone" onClick={() => setOpen(false)}>
                  Telephone
                </Link>
              </div>
            </div>

          </nav>
        </div>

        {open && (
          <div
            onClick={() => setOpen(false)}
            className="overlay"
          />
        )}

        <main className="main-container">
          {children}
        </main>

      </body>
    </html>
  )
}
