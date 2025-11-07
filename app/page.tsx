"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { InstagramFeed } from "@/components/instagram-feed"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section with Video/Image Background */}
        <section className="relative h-[88vh] overflow-hidden flex items-center justify-center">
          {/* Background Video or Image */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/italian-restaurant-warm-interior-with-family-dinin.jpg"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-black/10" />
          </div>

          {/* Hero Content */}
          <motion.div
            className="relative z-10 text-center text-white px-4 md:px-8 max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-balance"
              variants={itemVariants}
            >
              Benvenuti a Hostaria dei Ricordi
            </motion.h1>
            <motion.p className="text-lg md:text-2xl mb-8 text-balance text-white/90" variants={itemVariants}>
              Cucina italiana autentica in un'atmosfera calda e familiare
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button asChild className="btn-primary">
                <a href="/reservations">Prenota un Tavolo</a>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Menu Preview */}
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-[1200px] px-6 md:px-8">
            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold text-center mb-12"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Piatti Signature
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Pappardelle al Cinghiale",
                  description: "Tagliatelle fresche con ragù di cinghiale selvatico",
                  price: "€16",
                  image: "/fresh-pasta-with-wild-boar-sauce.jpg",
                },
                {
                  name: "Branzino al Forno",
                  description: "Branzino intero cotto al forno con erbe aromatiche",
                  price: "€24",
                  image: "/whole-roasted-sea-bass-with-herbs.jpg",
                },
                {
                  name: "Tiramisu della Casa",
                  description: "Ricetta tradizionale con caffè espresso e mascarpone",
                  price: "€8",
                  image: "/homemade-tiramisu-italian-dessert.jpg",
                },
              ].map((dish, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="card-elevated">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-foreground mb-2">{dish.name}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">{dish.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">{dish.price}</span>
                        <Button variant="outline" size="sm" className="btn-outline bg-transparent">
                          Scopri di più
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Button asChild size="lg" className="btn-outline">
                <a href="/menu">Vedi Menu Completo</a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold text-center mb-12"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Cosa Dicono di Noi
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Marco Rossi",
                  text: "Migliore ristorante della zona! Cucina autentica e accoglienza calorosa.",
                  rating: 5,
                },
                {
                  name: "Francesca Bianchi",
                  text: "Piatti deliziosissimi, soprattutto la pasta fresca. Torneremo subito!",
                  rating: 5,
                },
                {
                  name: "Giorgio Mancini",
                  text: "Atmosfera familiare, prezzi giusti. Perfetto per una cena speciale.",
                  rating: 5,
                },
                {
                  name: "Anna Verdi",
                  text: "I piatti sono buonissimi e il servizio è impeccabile. Che dire... bellissimo!",
                  rating: 5,
                },
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="p-6 card-elevated">
                    <div className="flex gap-1 mb-4">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} size={16} className="fill-primary text-primary" />
                        ))}
                    </div>
                    <p className="text-foreground mb-4 italic text-sm">"{testimonial.text}"</p>
                    <p className="font-bold text-primary">{testimonial.name}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <InstagramFeed />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <motion.div
            className="mx-auto max-w-4xl text-center px-6 md:px-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Vieni a Trovarci</h2>
            <p className="text-lg mb-8 opacity-90">
              Aperto da martedì a domenica. Disponibile per cene private e eventi.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-gray-100 text-primary font-bold rounded-[14px] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-[1px] transition-all"
            >
              <a href="/contacts">Contatti e Orari</a>
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}
