"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category_id: string
}

interface MenuCategory {
  id: string
  name: string
  description: string
  display_order: number
}

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMenuData() {
      try {
        const supabase = createClient()

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("menu_categories")
          .select("*")
          .order("display_order", { ascending: true })

        if (categoriesError) throw categoriesError

        // Fetch menu items
        const { data: itemsData, error: itemsError } = await supabase
          .from("menu_items")
          .select("*")
          .eq("is_available", true)

        if (itemsError) throw itemsError

        setCategories(categoriesData || [])
        setItems(itemsData || [])

        // Set first category as active
        if (categoriesData && categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id)
        }
      } catch (err) {
        console.error("Error loading menu:", err)
        setError("Failed to load menu. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadMenuData()
  }, [])

  const filteredItems = activeCategory ? items.filter((item) => item.category_id === activeCategory) : []

  if (loading) {
    return (
      <>
        <Header />
        <main className="py-24 bg-background">
          <div className="mx-auto max-w-[1200px] px-6 md:px-8 text-center">
            <p className="text-lg text-muted-foreground">Caricamento menu...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="py-24 bg-background">
          <div className="mx-auto max-w-[1200px] px-6 md:px-8 text-center">
            <p className="text-lg text-destructive">{error}</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="py-12 md:py-24 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">Menu</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scopri i nostri piatti preparati con ingredienti freschi e tradizione
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="lg"
                className={activeCategory === category.id ? "btn-primary" : "btn-outline"}
              >
                {category.name}
              </Button>
            ))}
          </motion.div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="card-elevated overflow-hidden">
                  <div className="relative h-64 w-full bg-muted">
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-display font-bold text-primary">€{item.price.toFixed(2)}</span>
                      <Button variant="outline" size="sm" className="btn-outline bg-transparent">
                        Dettagli
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Nessun piatto disponibile in questa categoria</p>
            </div>
          )}

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              Interessato? Prenota un tavolo e vieni a scoprire i nostri piatti!
            </p>
            <Button asChild size="lg" className="btn-primary">
              <a href="/reservations">Prenota Ora</a>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
