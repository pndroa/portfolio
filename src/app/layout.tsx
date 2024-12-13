import "./globals.css" // Import der Tailwind-CSS-Datei
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Erguen Bickici",
  description: "Portfolio of Erguen Bickici made by Erguen Bickici",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
