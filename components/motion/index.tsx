"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

/** Parallax */
export function Parallax({
  children,
  start = 0,
  end = 0.25,
  yFrom = -30,
  yTo = 30,
}: {
  children: React.ReactNode
  start?: number
  end?: number
  yFrom?: number
  yTo?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [start, end], [yFrom, yTo])
  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  )
}

/** Reveal */
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

/** Stagger */
export function Stagger({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}
