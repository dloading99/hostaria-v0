"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock, Mail } from "lucide-react"
import { Reveal, Parallax } from "@/components/motion"

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <Header />
      <main className="py-12 md:py-24 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <Reveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">Contatti</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vieni a trovarci o contattaci per informazioni e prenotazioni
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Information */}
            <Reveal y={24} className="space-y-6">
              <h2 className="text-3xl font-display font-bold mb-8 text-foreground">Informazioni di Contatto</h2>

              {[
                {
                  icon: MapPin,
                  title: "Indirizzo",
                  content: ["Via Roma 15", "84026 Oliveto Citra (SA)", "Italia"],
                  link: null,
                },
                {
                  icon: Phone,
                  title: "Telefono",
                  content: ["+39 828 761234"],
                  link: "tel:+39828761234",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: ["info@hostariadeircordi.it"],
                  link: "mailto:info@hostariadeircordi.it",
                },
                {
                  icon: Clock,
                  title: "Orari di Apertura",
                  content: [
                    "Lunedì: Chiuso",
                    "Martedì - Giovedì: 12:00 - 15:00 | 19:00 - 23:00",
                    "Venerdì - Sabato: 12:00 - 15:30 | 19:00 - 23:30",
                    "Domenica: 12:00 - 16:00 | 19:00 - 23:00",
                  ],
                  link: null,
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <Card className="card-elevated p-6 flex gap-4">
                      <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground mb-1">{item.title}</h3>
                        {item.link ? (
                          <a href={item.link} className="text-primary hover:underline font-semibold">
                            {item.content[0]}
                          </a>
                        ) : (
                          <div className="text-foreground space-y-1 text-sm">
                            {item.content.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white mt-4">
                  <a
                    href="https://wa.me/39828761234?text=Ciao%2C%20vorrei%20prenotare%20un%20tavolo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contattaci su WhatsApp
                  </a>
                </Button>
              </motion.div>
            </Reveal>

            {/* Contact Form */}
            <Reveal y={-24} className="space-y-8">
              <h2 className="text-3xl font-display font-bold text-foreground">Invia un Messaggio</h2>

              <Card className="card-elevated p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Il tuo nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="La tua email"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                      Oggetto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Oggetto del messaggio"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Il tuo messaggio..."
                    />
                  </div>

                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" size="lg" className="w-full btn-primary">
                      Invia Messaggio
                    </Button>
                  </motion.div>

                  {submitted && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                      Grazie! Il tuo messaggio è stato inviato con successo.
                    </div>
                  )}
                </form>
              </Card>
            </Reveal>
          </div>

          {/* Map Section */}
          <Parallax yFrom={-20} yTo={20}>
            <Reveal className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-foreground">Localizzazione</h2>
            </Reveal>
            <div className="relative w-full h-96 rounded-[16px] overflow-hidden shadow-[var(--shadow-soft)] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.5263487149937!2d15.233333!3d40.666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313d5c7c7c7c7c7%3A0x0!2sOliveto%20Citra%2C%20Province%20of%20Salerno!5e0!3m2!1sit!2sit!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Parallax>
        </div>
      </main>
      <Footer />
    </>
  )
}
