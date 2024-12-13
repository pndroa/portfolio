import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

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
    <html lang="en" className="dark text-white">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
