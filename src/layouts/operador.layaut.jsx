"use client"

import { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import {PageHeader} from "../pages/operador/Components/page-header"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
    <PageHeader />
  
    
      <div className="container mx-auto p-8 space-y-8"><Outlet/></div>
    </div>
  )
}
