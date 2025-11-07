"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Trash2, Edit2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category_id: string
  image_url: string
  is_available: boolean
}

interface Category {
  id: string
  name: string
}

export function AdminMenuItems() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
    is_available: true,
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const supabase = createClient()

      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("menu_categories")
        .select("*")
        .order("display_order", { ascending: true })

      if (categoriesError) throw categoriesError

      // Load menu items
      const { data: itemsData, error: itemsError } = await supabase
        .from("menu_items")
        .select("*")
        .order("created_at", { ascending: false })

      if (itemsError) throw itemsError

      setCategories(categoriesData || [])
      setItems(itemsData || [])
      setLoading(false)
    } catch (err) {
      console.error("[v0] Error loading data:", err)
      setError("Error loading menu items")
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.category_id) {
      setError("Please fill all required fields")
      return
    }

    try {
      const supabase = createClient()
      const itemData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category_id: formData.category_id,
        image_url: formData.image_url,
        is_available: formData.is_available,
      }

      if (editingId) {
        // Update
        const { error } = await supabase.from("menu_items").update(itemData).eq("id", editingId)

        if (error) throw error
      } else {
        // Insert
        const { error } = await supabase.from("menu_items").insert([itemData])

        if (error) throw error
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        category_id: "",
        image_url: "",
        is_available: true,
      })
      setEditingId(null)
      await loadData()
    } catch (err) {
      console.error("[v0] Error saving item:", err)
      setError("Error saving menu item")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("menu_items").delete().eq("id", id)

      if (error) throw error
      await loadData()
    } catch (err) {
      console.error("[v0] Error deleting item:", err)
      setError("Error deleting menu item")
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-foreground">Gestisci Menu</h2>

      {error && (
        <Card className="p-4 flex gap-3 items-start border-red-200 bg-red-50">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </Card>
      )}

      {/* Form */}
      <Card className="p-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-4">
          {editingId ? "Modifica Piatto" : "Aggiungi Nuovo Piatto"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Nome *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                placeholder="Nome del piatto"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Prezzo (€) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Descrizione</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
              placeholder="Descrizione del piatto"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Categoria *</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">URL Immagine</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              checked={formData.is_available}
              onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="available" className="text-sm font-semibold text-foreground">
              Disponibile
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
              {editingId ? "Salva Modifiche" : "Aggiungi Piatto"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setFormData({
                    name: "",
                    description: "",
                    price: "",
                    category_id: "",
                    image_url: "",
                    is_available: true,
                  })
                }}
              >
                Annulla
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Items List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">Nessun piatto nel menu</Card>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <p className="text-sm text-primary font-semibold mt-2">€{item.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingId(item.id)
                      setFormData({
                        name: item.name,
                        description: item.description,
                        price: item.price.toString(),
                        category_id: item.category_id,
                        image_url: item.image_url,
                        is_available: item.is_available,
                      })
                    }}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
