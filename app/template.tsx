"use client"

import type React from "react"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import { motionTokens as t } from "@/lib/motion/tokens"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: t.dur.md, ease: t.ease.out } }}
        exit={{ opacity: 0, y: reduce ? 0 : -8, transition: { duration: t.dur.sm, ease: t.ease.inOut } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
