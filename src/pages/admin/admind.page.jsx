import  React from "react"
import { AppSidebar } from "../admin/slidebar"
import { Outlet } from "react-router-dom"
export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex-1 ml-64"><Outlet></Outlet></div>
    </div>
  )
}
