import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar" // Увери се, че файлът в components се казва точно така

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WebWanted | High-Performance Web Solutions",
  description: "Code Laboratory, Speed Insights and Modern Web Development with Next.js and Medusa.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg" className="dark">
      <body className={`${inter.className} bg-black antialiased`}>
        {/* Навигацията се рендерира веднъж тук и работи за целия сайт */}
        <Navbar />
        
        {/* Тук се зарежда съдържанието на всяка отделна страница */}
        {children}
        
        {/* Компонент за изскачащи известия (Toast) */}
        <Toaster />
      </body>
    </html>
  )
}