import Navbar from "@/components/Navbar"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import About from "@/components/About"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My Markdown Blog",
  description: "A blog built with Next.js and Markdown",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}