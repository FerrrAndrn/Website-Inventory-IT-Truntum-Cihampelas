"use client"

import { motion } from "framer-motion"
import { FaInstagram, FaTiktok } from "react-icons/fa"

export default function Home() {
  return (
    <section className="home">

      <div className="home-wrapper">

        <motion.h1
          className="home-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Welcome to the Asset Management System
        </motion.h1>

        <motion.p
          className="home-subtitle"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          This platform is designed to manage, monitor, and maintain 
          operational assets at Truntum Cihampelas Hotel efficiently, 
          accurately, and in real-time.
        </motion.p>

        <motion.div
          className="social-links"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="https://instagram.com/truntumcihampelas"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram size={18} />
            <span>@truntumcihampelas</span>
          </motion.a>

          <motion.a
            href="https://www.tiktok.com/@truntumcihampelas"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTiktok size={18} />
            <span>Truntum Cihampelas</span>
          </motion.a>
        </motion.div>

      </div>

    </section>
  )
}
