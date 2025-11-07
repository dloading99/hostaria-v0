"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, LogOut, Menu, X } from "lucide-react"
import { AdminReservations } from "@/components/admin/admin-reservations"
import { AdminMenuItems } from "@/components/admin/admin-menu-items"
import { AdminDashboard as AdminDashboardComponent } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showLoginError, setShowLoginError] = useState(false)
  const [activeTab, setActiveTab] = useState<"dashboard" | "menu" | "reservations">("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adminDisabled, setAdminDisabled] = useState(false)

  useEffect(() => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    if (!adminPassword || adminPassword.length === 0) {
      setAdminDisabled(true)
    }
  }, [])

  // Simple password authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (!adminPassword) {
      setShowLoginError(true)
      return
    }

    if (password === adminPassword) {
      setAuthenticated(true)
      setShowLoginError(false)
      localStorage.setItem("admin_authenticated", "true")
    } else {
      setShowLoginError(true)
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setPassword("")
    localStorage.removeItem("admin_authenticated")
    setSidebarOpen(false)
  }

  // Check authentication on load
  useEffect(() => {
    const isAuth = localStorage.getItem("admin_authenticated") === "true"
    if (isAuth) {
      setAuthenticated(true)
    }
  }, [])

  if (adminDisabled) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex gap-3 items-start mb-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Amministrazione Disabilitata</h1>
            </div>
          </div>
          <p className="text-foreground mb-6">
            La sezione amministrazione non è disponibile. Per abilitarla, aggiungi la variabile d'ambiente{" "}
            <code className="bg-muted px-2 py-1 rounded text-sm">NEXT_PUBLIC_ADMIN_PASSWORD</code> alle tue variabili di
            Vercel.
          </p>
          <Button asChild className="w-full btn-primary">
            <a href="/">Torna alla Home</a>
          </Button>
        </Card>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 card-elevated">
          <h1 className="text-3xl font-display font-bold text-center text-foreground mb-2">Admin</h1>
          <p className="text-center text-muted-foreground mb-8">Hostaria dei Ricordi</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-[12px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Inserisci password"
                autoFocus
              />
            </div>

            {showLoginError && (
              <div className="flex gap-2 items-start p-3 bg-red-50 border border-red-200 rounded-[12px]">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">Password non corretta. Riprova.</p>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full btn-primary">
              Accedi
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex gap-4 items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex gap-2 items-center bg-transparent btn-outline"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Esci</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className={`${sidebarOpen ? "block" : "hidden"} md:block md:col-span-1`}>
            <div className="sticky top-24 space-y-2">
              <button
                onClick={() => {
                  setActiveTab("dashboard")
                  setSidebarOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-[12px] font-semibold transition ${
                  activeTab === "dashboard" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab("menu")
                  setSidebarOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-[12px] font-semibold transition ${
                  activeTab === "menu" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => {
                  setActiveTab("reservations")
                  setSidebarOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-[12px] font-semibold transition ${
                  activeTab === "reservations" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Prenotazioni
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === "dashboard" && <AdminDashboardComponent />}
            {activeTab === "menu" && <AdminMenuItems />}
            {activeTab === "reservations" && <AdminReservations />}
          </div>
        </div>
      </div>
    </div>
  )
}
