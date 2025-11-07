"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar, Users, UtensilsCrossed, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Stats {
  totalReservations: number
  todayReservations: number
  menuItems: number
  categories: number
  loading: boolean
  error: string | null
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalReservations: 0,
    todayReservations: 0,
    menuItems: 0,
    categories: 0,
    loading: true,
    error: null,
  })

  useEffect(() => {
    async function loadStats() {
      try {
        const supabase = createClient()

        // Get total reservations
        const { count: totalCount } = await supabase.from("reservations").select("*", { count: "exact", head: true })

        // Get today's reservations
        const today = new Date().toISOString().split("T")[0]
        const { count: todayCount } = await supabase
          .from("reservations")
          .select("*", { count: "exact", head: true })
          .eq("date", today)

        // Get menu items
        const { count: itemsCount } = await supabase.from("menu_items").select("*", { count: "exact", head: true })

        // Get categories
        const { count: categoriesCount } = await supabase
          .from("menu_categories")
          .select("*", { count: "exact", head: true })

        setStats({
          totalReservations: totalCount || 0,
          todayReservations: todayCount || 0,
          menuItems: itemsCount || 0,
          categories: categoriesCount || 0,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error("[v0] Error loading stats:", error)
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Error loading statistics",
        }))
      }
    }

    loadStats()
  }, [])

  if (stats.loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (stats.error) {
    return (
      <Card className="p-6 flex gap-3 items-start border-red-200 bg-red-50">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <p className="text-red-700">{stats.error}</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-foreground">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Reservations */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Prenotazioni Totali</p>
              <h3 className="text-4xl font-bold text-foreground mt-2">{stats.totalReservations}</h3>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </Card>

        {/* Today's Reservations */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Prenotazioni Oggi</p>
              <h3 className="text-4xl font-bold text-foreground mt-2">{stats.todayReservations}</h3>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Piatti in Menu</p>
              <h3 className="text-4xl font-bold text-foreground mt-2">{stats.menuItems}</h3>
            </div>
            <UtensilsCrossed className="w-8 h-8 text-primary" />
          </div>
        </Card>

        {/* Categories */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Categorie</p>
              <h3 className="text-4xl font-bold text-foreground mt-2">{stats.categories}</h3>
            </div>
            <UtensilsCrossed className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-serif font-bold text-lg text-foreground mb-2">Benvenuto in Admin</h3>
        <p className="text-foreground">
          Gestisci le prenotazioni, i piatti del menu e tutte le informazioni del ristorante da questa dashboard.
          Utilizza le schede sopra per navigare alle diverse sezioni.
        </p>
      </Card>
    </div>
  )
}
