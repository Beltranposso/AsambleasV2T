"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Vote, BarChart3, Calendar, UserCheck } from "lucide-react"
import AssemblyDetail from "./assembly-detail"
import DashboardView from "./views/dashboard-view"
import AssembliesView from "./views/assemblies-view"
import OperatorsView from "./views/operators-view"

export default function CoordinatorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedAssembly, setSelectedAssembly] = useState(null)

  // Mock data para operadores
  const operators = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      telefono: "+56 9 1111 2222",
      cedula: "15.555.666-7",
      fechaCreacion: "2024-01-05",
      estado: "activo",
      asambleasAsignadas: [1, 2],
      ultimaActividad: "2024-01-15 14:30",
    },
    {
      id: 2,
      name: "Carmen Silva",
      email: "carmen.silva@example.com",
      telefono: "+56 9 3333 4444",
      cedula: "18.777.888-9",
      fechaCreacion: "2024-01-08",
      estado: "activo",
      asambleasAsignadas: [1],
      ultimaActividad: "2024-01-14 16:45",
    },
    {
      id: 3,
      name: "Roberto Morales",
      email: "roberto.morales@example.com",
      telefono: "+56 9 5555 6666",
      cedula: "12.999.000-1",
      fechaCreacion: "2024-01-10",
      estado: "inactivo",
      asambleasAsignadas: [],
      ultimaActividad: "2024-01-12 10:15",
    },
    {
      id: 4,
      name: "Patricia López",
      email: "patricia.lopez@example.com",
      telefono: "+56 9 7777 8888",
      cedula: "20.111.222-3",
      fechaCreacion: "2024-01-12",
      estado: "activo",
      asambleasAsignadas: [2, 3],
      ultimaActividad: "2024-01-15 09:20",
    },
  ]

  // Mock data para asambleas
  const assemblies = [
    {
      id: 1,
      name: "Asamblea General 2024",
      date: "2024-01-15",
      time: "10:00",
      status: "programada",
      participants: 45,
      description: "Asamblea general anual para revisión de presupuestos",
      operadoresAsignados: [1, 2],
    },
    {
      id: 2,
      name: "Asamblea Extraordinaria",
      date: "2024-01-20",
      time: "14:00",
      status: "en_curso",
      participants: 32,
      description: "Votación de nuevas políticas",
      operadoresAsignados: [1, 4],
    },
    {
      id: 3,
      name: "Asamblea de Socios",
      date: "2024-01-10",
      time: "16:00",
      status: "finalizada",
      participants: 28,
      description: "Elección de nueva junta directiva",
      operadoresAsignados: [4],
    },
  ]

  const openAssemblyDetail = (assembly) => {
    setSelectedAssembly(assembly)
  }

  const closeAssemblyDetail = () => {
    setSelectedAssembly(null)
  }

  // Si hay una asamblea seleccionada, mostrar la vista de detalle
  if (selectedAssembly) {
    return <AssemblyDetail assembly={selectedAssembly} onBack={closeAssemblyDetail} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Coordinador</h1>
                <p className="text-sm text-gray-600">Gestión de Asambleas y Votaciones</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-blue-100 text-blue-700">CO</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Coordinador</p>
                <p className="text-xs text-gray-600">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-blue-100 rounded-lg p-1">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="assemblies"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Asambleas
            </TabsTrigger>
            <TabsTrigger
              value="operators"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Operadores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardView assemblies={assemblies} operators={operators} onOpenAssembly={openAssemblyDetail} />
          </TabsContent>

          <TabsContent value="assemblies">
            <AssembliesView assemblies={assemblies} operators={operators} onOpenAssembly={openAssemblyDetail} />
          </TabsContent>

          <TabsContent value="operators">
            <OperatorsView operators={operators} assemblies={assemblies} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
