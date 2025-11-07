import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="py-12 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">La Nostra Storia</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Una famiglia, una passione, una cucina autentica
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">Hostaria dei Ricordi</h2>
              <p className="text-lg text-foreground mb-4 leading-relaxed">
                Dal 1985, Hostaria dei Ricordi è il cuore pulsante della cucina tradizionale italiana a Oliveto Citra.
                Nata da una passione familiare per la buona tavola e la genuinità dei sapori autentici, la nostra
                hostaria rappresenta ben più di un semplice ristorante: è uno spazio dove le ricordi si incontrano, dove
                ogni piatto racconta una storia e ogni visita diventa un ricordo indimenticabile.
              </p>
              <p className="text-lg text-foreground mb-4 leading-relaxed">
                La nostra filosofia è semplice: ingredienti freschi, ricette tramandate di generazione in generazione, e
                un'accoglienza calorosa che farebbe sentire come famiglia ogni nostro ospite. Ogni piatto è preparato
                con cura e dedizione, rispettando la tradizione culinaria campana e valorizzando i prodotti locali di
                eccellenza.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/rustic-italian-family-restaurant-interior-warm-atm.jpg"
                alt="Hostaria dei Ricordi Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
              I Nostri Valori
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Autenticità",
                  description:
                    "Ricette tradizionali campane preparate secondo metodi collaudati nel tempo, senza compromessi sulla qualità.",
                },
                {
                  title: "Freschezza",
                  description: "Ingredienti freschi e locali scelti giornalmente dai nostri fornitori fidati di zona.",
                },
                {
                  title: "Accoglienza",
                  description:
                    "Un ambiente caldo e familiare dove ogni ospite è trattato come un membro della famiglia.",
                },
              ].map((value, idx) => (
                <Card key={idx} className="p-8 text-center hover:shadow-lg transition">
                  <h3 className="text-2xl font-serif font-bold mb-4 text-primary">{value.title}</h3>
                  <p className="text-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
              La Nostra Famiglia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Giuseppe",
                  role: "Chef e Fondatore",
                  bio: "Con più di 35 anni di esperienza, Giuseppe è il cuore culinario di Hostaria dei Ricordi.",
                },
                {
                  name: "Maria",
                  role: "Chef Pasticcera",
                  bio: "Maria prepara i nostri dolci tradizionali seguendo ricette familiari tramandate da generazioni.",
                },
                {
                  name: "Antonio",
                  role: "Sommelier",
                  bio: "Antonio seleziona i migliori vini campani per accompagnare perfettamente i nostri piatti.",
                },
              ].map((member, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-64 w-full bg-muted">
                    <Image
                      src={`/portrait-restaurant-professional-.jpg?height=300&width=300&query=portrait%20restaurant%20professional%20${idx}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                    <p className="text-foreground">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
