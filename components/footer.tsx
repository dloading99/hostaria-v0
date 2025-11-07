import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-white border-t border-border mt-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Hostaria dei Ricordi</h3>
            <p className="text-sm opacity-90">
              Ristorante familiare con piatti autentici della cucina italiana e mediterranea.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Link Veloci</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/menu" className="hover:text-accent transition">
                Menu
              </Link>
              <Link href="/reservations" className="hover:text-accent transition">
                Prenota
              </Link>
              <Link href="/about" className="hover:text-accent transition">
                Chi Siamo
              </Link>
              <Link href="/contacts" className="hover:text-accent transition">
                Contatti
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Seguici</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="hover:text-accent transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-accent transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Hostaria dei Ricordi. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
