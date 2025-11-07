"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from "lucide-react"
import { Reveal } from "@/components/motion"

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2",
    special_requests: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error submitting reservation")
      }

      setMessage({
        type: "success",
        text: "Prenotazione confermata! Ti abbiamo inviato un email di conferma.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "19:00",
        guests: "2",
        special_requests: "",
      })
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error submitting reservation",
      })
    } finally {
      setLoading(false)
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      <Header />
      <main className="py-12 md:py-24 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">Prenota un Tavolo</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prenota il tuo tavolo presso Hostaria dei Ricordi. Ti aspettiamo!
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reservation Form */}
            <Reveal y={24} className="lg:col-span-2">
              <Card className="card-elevated p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Mario Rossi"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="mario@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+39 328 1234567"
                    />
                  </div>

                  {/* Date and Time Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-semibold text-foreground mb-2">
                        Data *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        required
                        className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label htmlFor="time" className="block text-sm font-semibold text-foreground mb-2">
                        Ora *
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                      </select>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-sm font-semibold text-foreground mb-2">
                      Numero di Ospiti *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "ospite" : "ospiti"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label htmlFor="special_requests" className="block text-sm font-semibold text-foreground mb-2">
                      Richieste Speciali (Allergie, Preferenze, Occasioni...)
                    </label>
                    <textarea
                      id="special_requests"
                      name="special_requests"
                      value={formData.special_requests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Esempio: compleanno, allergia al glutine, preferenza di tavolino..."
                    />
                  </div>

                  {/* Messages */}
                  {message && (
                    <div
                      className={`p-4 rounded-[12px] text-sm ${
                        message.type === "success"
                          ? "bg-green-50 border border-green-200 text-green-700"
                          : "bg-red-50 border border-red-200 text-red-700"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" disabled={loading} size="lg" className="w-full btn-primary">
                      {loading ? "Elaborazione..." : "Prenota Ora"}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground text-center">* Campi obbligatori</p>
                </form>
              </Card>
            </Reveal>

            {/* Info Sidebar */}
            <Reveal y={-24} className="space-y-6">
              <Card className="card-elevated p-6">
                <h3 className="text-lg font-display font-bold text-foreground mb-4">Informazioni Utili</h3>
                <div className="space-y-4 text-sm text-foreground">
                  <div className="flex gap-3">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Prenotazione Online</p>
                      <p className="text-muted-foreground text-xs">Disponibile da martedì a domenica</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Conferma Prenotazione</p>
                      <p className="text-muted-foreground text-xs">Riceverai una email di conferma</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Gruppo Numeroso?</p>
                      <p className="text-muted-foreground text-xs">Per gruppi &gt; 20 persone, chiama direttamente</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="card-elevated p-6 bg-primary/5 border-primary/20">
                <h3 className="text-lg font-display font-bold text-foreground mb-4">Preferisci Telefonare?</h3>
                <p className="text-foreground mb-4 text-sm">
                  Puoi contattarci direttamente per prenotare o ricevere informazioni
                </p>
                <div className="space-y-2">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild size="lg" className="w-full btn-primary">
                      <a href="tel:+39828761234">+39 828 761234</a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild size="lg" className="w-full btn-outline">
                      <a
                        href="https://wa.me/39828761234?text=Ciao%2C%20vorrei%20prenotare%20un%20tavolo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
