"use client"

import type React from "react"
import { motion } from "framer-motion"

export function Reveal({
  children,
  delay = 0,
  y = 12,
  once = true,
  amount = 0.2,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  once?: boolean
  amount?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0% -10% 0%", amount }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
