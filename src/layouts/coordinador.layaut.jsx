import { Inter } from "next/font/google"
import { Outlet } from "react-router-dom"
import {PageHeader} from "../pages/coordinador/page"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Coordinador de Asambleas",
  description: "Sistema de gestión de asambleas y votaciones",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
