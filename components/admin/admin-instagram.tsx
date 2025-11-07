"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function AdminInstagram() {
  const [instagramHandle, setInstagramHandle] = useState("hostaria_dei_ricordi")
  const [apiKey, setApiKey] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!instagramHandle) {
      alert("Please enter an Instagram handle")
      return
    }

    // Save to localStorage for persistence
    localStorage.setItem("instagram_handle", instagramHandle)
    if (apiKey) {
      localStorage.setItem("instagram_api_key", apiKey)
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-foreground">Instagram Integration</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Card */}
        <Card className="p-6">
          <h3 className="text-lg font-serif font-bold text-foreground mb-4">Configurazione</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Instagram Handle</label>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value.replace("@", ""))}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                placeholder="hostaria_dei_ricordi"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Instagram Access Token (Opzionale)
              </label>
              <textarea
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-xs"
                placeholder="Incolla il tuo access token qui..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Per il feed dinamico, ottieni un access token da Instagram Graph API
              </p>
            </div>

            <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 text-white">
              Salva Configurazione
            </Button>

            {saved && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                Configurazione salvata con successo!
              </div>
            )}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6">
          <h3 className="text-lg font-serif font-bold text-foreground mb-4">Come Funziona</h3>

          <div className="space-y-4 text-sm text-foreground">
            <div className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">1</span>
              <p>Il feed Instagram viene visualizzato sulla homepage</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">2</span>
              <p>Gli utenti possono cliccare per visitare il tuo profilo</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">3</span>
              <p>Coi tuoi ultimi post apparireranno automaticamente</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">4</span>
              <p>Per aggiornamenti in tempo reale, usa l'API token</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Se non hai un access token, il feed mostrerà placeholder che collegano al tuo profilo Instagram
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
