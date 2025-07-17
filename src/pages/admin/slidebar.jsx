"use client"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  Settings,
  Users,
  UserCheck,
  TrendingUp,
  HelpCircle,
  Crown,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { CreateAssemblyForm } from "./components/create-assembly-form"

const navigationItems = [
  {
    title: "Dashboard",
    to: "",
    icon: Home,
  },
  {
    title: "Asambleas", 
    to: "asambleas",
    icon: Calendar,
  },
  {
    title: "Coordinadores",
    to: "coordinadores",
    icon: UserCheck,
  },
  {
    title: "Participantes",
    to: "participantes",
    icon: Users,
  },
  {
    title: "Informes",
    to: "informes",
    icon: FileText,
  },
  {
    title: "Analíticas",
    to: "analiticas",
    icon: TrendingUp,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const [createAssemblyOpen, setCreateAssemblyOpen] = useState(false)

const isActive = (to) => {
  const currentPath = location.pathname;
  
  // Normalizar las rutas (remover trailing slash)
  const normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
  const normalizedTo = to.replace(/\/$/, '') || '/';
  
  // Caso especial para el dashboard (/admin)
  if (normalizedTo === "/admin") {
    return normalizedCurrent === "/admin";
  }
  console
  // Para todas las demás rutas
  return normalizedCurrent === normalizedTo || normalizedCurrent.startsWith(normalizedTo + "/");
}

  return (
    <>
      <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">Asamblea</span>
          </Link>
        </div>

        {/* Create Button */}
        <div className="p-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12 text-base font-medium"
            onClick={() => setCreateAssemblyOpen(true)}
          >
            <span className="text-lg mr-2">+</span>
            Crear
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors text-base
                  ${
                    isActive(item.to)
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <item.icon className={`h-5 w-5 ${isActive(item.to) ? "text-blue-600" : "text-gray-500"}`} />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Upgrade Section */}
          <div className="mt-8 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Plan Premium</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">Accede a funciones avanzadas y reportes detallados</p>
              <Button
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
              >
                Actualizar plan
              </Button>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="space-y-1 border-t border-gray-100 pt-4">
            <Link
              to="/analiticas"
              className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors text-base text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <TrendingUp className="h-5 w-5 text-gray-500" />
              <span>Analíticas</span>
            </Link>

            <Link
              to="/configuracion"
              className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors text-base text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <Settings className="h-5 w-5 text-gray-500" />
              <span>Centro de Admin</span>
            </Link>

            <button className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors text-base text-gray-700 hover:bg-gray-50 hover:text-gray-900">
              <HelpCircle className="h-5 w-5 text-gray-500" />
              <span>Ayuda</span>
            </button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Administrador</p>
              <p className="text-xs text-gray-500 truncate">admin@empresa.com</p>
            </div>
          </div>
        </div>
      </div>

      <CreateAssemblyForm open={createAssemblyOpen} onOpenChange={setCreateAssemblyOpen} />
    </>
  )
}
