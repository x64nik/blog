import Navbar from "@/components/Navbar"
import "./globals.css"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: "ACK, Rushi here",
  description: "Devops, SRE, Homelab, self-hosted",
  icons: "./favicon.ico"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}