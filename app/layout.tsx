'use client'

import './globals.css'
import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [search, setSearch] = useState('')
  const pathname = usePathname()

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
              <div className="header-search">
                <input
                  type="text"
                  placeholder="Cari asset..."
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {/* 🔍 ICON DI SINI */}
                <button className="search-btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
</button>
              </div>
            </div>
          </div>

          <div className="header-logo">
            <Image
              src="/trb.png"
              alt="Truntum Cihampelas"
              width={197}
              height={50}
              priority
            />
          </div>
        </header>

        <div className={`sidebar ${open ? 'sidebar-open' : ''}`}>
          <div className="sidebar-title">Menu</div>

          <nav className="sidebar-menu">

            <Link
              href="/"
              className={pathname === '/' ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
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

                <Link href="/cctv" className={pathname === '/cctv' ? 'active' : ''} onClick={() => setOpen(false)}>CCTV</Link>
                <Link href="/computer" className={pathname === '/computer' ? 'active' : ''} onClick={() => setOpen(false)}>Computer</Link>
                
                <Link href="/ittools" className={pathname === '/ittools' ? 'active' : ''} onClick={() => setOpen(false)}>IT Equipment</Link>
                <Link href="/laptop" className={pathname === '/laptop' ? 'active' : ''} onClick={() => setOpen(false)}>Laptop</Link>
                <Link href="/printer" className={pathname === '/printer' ? 'active' : ''} onClick={() => setOpen(false)}>Printer</Link>

                <Link href="/ref" className={pathname === '/ref' ? 'active' : ''} onClick={() => setOpen(false)}>Refrigerator</Link>

                <Link href="/sdb" className={pathname === '/sdb' ? 'active' : ''} onClick={() => setOpen(false)}>Safe Deposit Box</Link>
                <Link href="/tv" className={pathname === '/tv' ? 'active' : ''} onClick={() => setOpen(false)}>Smart TV</Link>
                <Link href="/telephone" className={pathname === '/telephone' ? 'active' : ''} onClick={() => setOpen(false)}>Telephone</Link>

                <Link href="/engtool" className={pathname === '/engtool' ? 'active' : ''} onClick={() => setOpen(false)}>Engineering Tools</Link>

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