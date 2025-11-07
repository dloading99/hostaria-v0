"use client"

import type React from "react"

import { ReactLenis } from "lenis/react"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true, smoothTouch: false }}>
      {children}
    </ReactLenis>
  )
}
