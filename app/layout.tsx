import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AuthProvider from "@/app/components/auth-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Pottery Mastery - Learn Pottery with Expert Video Tutorials",
  description: "Master the art of pottery with our comprehensive 7-video course. Get lifetime access for just $29.99.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
