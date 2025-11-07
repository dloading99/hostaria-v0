"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-display font-bold text-primary hover:text-primary/80 transition">
            Hostaria dei Ricordi
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-foreground hover:text-primary transition text-sm font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-foreground hover:text-primary transition text-sm font-medium">
              Menu
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition text-sm font-medium">
              Chi Siamo
            </Link>
            <Link href="/contacts" className="text-foreground hover:text-primary transition text-sm font-medium">
              Contatti
            </Link>
            <Button asChild className="btn-primary">
              <a href="/reservations">Prenota</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/" className="text-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/menu" className="text-foreground hover:text-primary">
              Menu
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary">
              Chi Siamo
            </Link>
            <Link href="/contacts" className="text-foreground hover:text-primary">
              Contatti
            </Link>
            <Button asChild className="w-full btn-primary">
              <a href="/reservations">Prenota</a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
