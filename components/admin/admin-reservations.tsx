"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  special_requests: string
  status: string
  created_at: string
}

export function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed">("all")

  useEffect(() => {
    loadReservations()
  }, [])

  async function loadReservations() {
    try {
      const supabase = createClient()

      let query = supabase.from("reservations").select("*").order("date", { ascending: false })

      if (filter !== "all") {
        query = query.eq("status", filter)
      }

      const { data, error: err } = await query

      if (err) throw err

      setReservations(data || [])
      setLoading(false)
    } catch (err) {
      console.error("[v0] Error loading reservations:", err)
      setError("Error loading reservations")
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const supabase = createClient()
      const { error: err } = await supabase.from("reservations").update({ status: newStatus }).eq("id", id)

      if (err) throw err
      await loadReservations()
    } catch (err) {
      console.error("[v0] Error updating status:", err)
      setError("Error updating status")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      const supabase = createClient()
      const { error: err } = await supabase.from("reservations").delete().eq("id", id)

      if (err) throw err
      await loadReservations()
    } catch (err) {
      console.error("[v0] Error deleting reservation:", err)
      setError("Error deleting reservation")
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-foreground">Prenotazioni</h2>

      {error && (
        <Card className="p-4 flex gap-3 items-start border-red-200 bg-red-50">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </Card>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => {
            setFilter("all")
            loadReservations()
          }}
          variant={filter === "all" ? "default" : "outline"}
        >
          Tutte
        </Button>
        <Button onClick={() => setFilter("pending")} variant={filter === "pending" ? "default" : "outline"}>
          In Sospeso
        </Button>
        <Button onClick={() => setFilter("confirmed")} variant={filter === "confirmed" ? "default" : "outline"}>
          Confermate
        </Button>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">Nessuna prenotazione</Card>
        ) : (
          filtered.map((reservation) => (
            <Card key={reservation.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-foreground">{reservation.name}</h4>
                  <p className="text-sm text-muted-foreground">{reservation.email}</p>
                  <p className="text-sm text-muted-foreground">{reservation.phone}</p>
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Data:</strong> {new Date(reservation.date).toLocaleDateString("it-IT")}
                  </p>
                  <p className="text-sm">
                    <strong>Ora:</strong> {reservation.time}
                  </p>
                  <p className="text-sm">
                    <strong>Ospiti:</strong> {reservation.guests}
                  </p>
                </div>
              </div>

              {reservation.special_requests && (
                <p className="text-sm mt-3 p-2 bg-muted rounded text-foreground">
                  <strong>Note:</strong> {reservation.special_requests}
                </p>
              )}

              <div className="flex gap-2 mt-4">
                <select
                  value={reservation.status}
                  onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                  className="px-3 py-1 text-sm border border-input rounded-lg bg-background text-foreground"
                >
                  <option value="pending">In Sospeso</option>
                  <option value="confirmed">Confermata</option>
                  <option value="cancelled">Annullata</option>
                </select>
                <Button variant="outline" size="sm" onClick={() => handleDelete(reservation.id)}>
                  <Trash2 size={16} className="text-red-600" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
