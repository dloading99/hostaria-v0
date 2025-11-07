"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"

export function InstagramFeed() {
  useEffect(() => {
    // Load Instagram embed script
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    } else {
      const script = document.createElement("script")
      script.src = "https://www.instagram.com/embed.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  // Instagram handle for the restaurant (you can customize this)
  const instagramHandle = "hostaria_dei_ricordi"

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Seguici su Instagram</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Instagram Timeline Widget */}
          <Card className="overflow-hidden bg-background p-4">
            <div className="text-center py-12">
              <p className="text-foreground mb-4">Segui il nostro profilo Instagram per gli ultimi aggiornamenti</p>
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                @{instagramHandle}
              </a>
            </div>
          </Card>

          {/* Instagram Info Card */}
          <Card className="p-6 bg-background">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Storie della Nostra Cucina</h3>
            <p className="text-foreground mb-4">
              Scopri i nostri piatti, gli ingredienti freschi, e la passione che mettiamo in ogni creazione. Seguici su
              Instagram per ricette, dietro le quinte, e i nostri ultimi piatti speciali.
            </p>
            <ul className="space-y-2 text-foreground text-sm">
              <li>✓ Foto dei nostri piatti signature</li>
              <li>✓ Ingredienti freschi e locali</li>
              <li>✓ Video cooking live</li>
              <li>✓ Promzioni e menù speciali</li>
              <li>✓ Eventi e serate a tema</li>
            </ul>
          </Card>
        </div>

        {/* Instagram Feed Grid (Alternative: Manual feed via Supabase) */}
        <InstagramFeedGrid instagramHandle={instagramHandle} />
      </div>
    </section>
  )
}

interface InstagramPost {
  id: string
  image: string
  caption: string
  link: string
}

function InstagramFeedGrid({ instagramHandle }: { instagramHandle: string }) {
  // Sample posts (you can fetch these from Instagram API via a backend route)
  // For now, displaying placeholder cards that users can click to view on Instagram

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <a
          key={i}
          href={`https://instagram.com/${instagramHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-lg bg-muted aspect-square hover:shadow-lg transition"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-8 h-8 text-primary mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
              <p className="text-xs font-semibold text-muted-foreground group-hover:text-foreground">Post #{i}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}
