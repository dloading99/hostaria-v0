import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

interface ReservationRequest {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  special_requests?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ReservationRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.date || !body.time || !body.guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate guests number
    const guestsNum = Number.parseInt(body.guests)
    if (guestsNum < 1 || guestsNum > 20) {
      return NextResponse.json({ error: "Guests must be between 1 and 20" }, { status: 400 })
    }

    // Create Supabase client
    const supabase = await createClient()

    // Insert reservation into database
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        date: body.date,
        time: body.time,
        guests: guestsNum,
        special_requests: body.special_requests || null,
        status: "pending",
      })
      .select()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Error saving reservation" }, { status: 500 })
    }

    // Send confirmation email
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "noreply@hostariadeircordi.it",
          to: body.email,
          subject: "Prenotazione Confermata - Hostaria dei Ricordi",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #D4784F;">Prenotazione Confermata</h1>
              <p>Caro/a <strong>${body.name}</strong>,</p>
              <p>La tua prenotazione presso Hostaria dei Ricordi è stata registrata con successo!</p>
              
              <div style="background-color: #f5f1e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #5C3E3E; margin-top: 0;">Dettagli della Prenotazione</h2>
                <p><strong>Data:</strong> ${new Date(body.date).toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                <p><strong>Ora:</strong> ${body.time}</p>
                <p><strong>Ospiti:</strong> ${body.guests}</p>
                <p><strong>Nome:</strong> ${body.name}</p>
                <p><strong>Telefono:</strong> ${body.phone}</p>
                ${body.special_requests ? `<p><strong>Note Speciali:</strong> ${body.special_requests}</p>` : ""}
              </div>

              <p>Ti consigliamo di arrivare 5-10 minuti prima dell'orario prenotato.</p>
              
              <div style="background-color: #6B8E23; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <p style="margin: 0;"><strong>Contattaci se hai domande</strong></p>
                <p style="margin: 10px 0 0 0;">+39 828 761234 | info@hostariadeircordi.it</p>
              </div>

              <p style="color: #666; font-size: 12px; margin-top: 20px;">
                Hostaria dei Ricordi | Via Roma 15, 84026 Oliveto Citra (SA)
              </p>
            </div>
          `,
        }),
      })

      if (!emailResponse.ok) {
        console.error("[v0] Email error:", await emailResponse.text())
      }
    } catch (emailError) {
      console.error("[v0] Email sending failed:", emailError)
      // Don't fail the reservation if email fails
    }

    return NextResponse.json(
      {
        message: "Reservation created successfully",
        data: data,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
