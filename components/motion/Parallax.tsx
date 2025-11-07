"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [start, end], [yFrom, yTo])

  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  )
}
