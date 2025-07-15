"use client"

import { useState } from "react"
import { PageHeader } from "./components/page-header"
import { CreateAssemblyForm } from "../../components/create-assembly-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Progress } from "../../../../components/ui/progress"

import {
  Calendar,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  UserCheck,
  Star,
  ArrowRight,
  Plus,
} from "lucide-react"
import { VotingPreview } from "../../components/voting-preview"

// Mock data
const assembliesData = [
  {
    id: 1,
    name: "Asamblea General Ordinaria 2024",
    date: "2024-03-15",
    time: "10:00",
    status: "Completada",
    participants: 156,
    coordinatorId: 1,
  },
  {
    id: 2,
    name: "Asamblea de Socios Q1",
    date: "2024-04-10",
    time: "09:00",
    status: "Programada",
    participants: 203,
    coordinatorId: null,
  },
  {
    id: 3,
    name: "Asamblea Trimestral Q2",
    date: "2024-04-25",
    time: "15:00",
    status: "Programada",
    participants: 0,
    coordinatorId: null,
  },
]

const coordinatorsData = [
  {
    id: 1,
    name: "Dr. María González",
    department: "Recursos Humanos",
    assembliesManaged: 12,
    rating: 4.8,
    status: "Disponible",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Ing. Carlos Rodríguez",
    department: "Operaciones",
    assembliesManaged: 8,
    rating: 4.6,
    status: "Disponible",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Lic. Ana Martínez",
    department: "Legal",
    assembliesManaged: 15,
    rating: 4.9,
    status: "Ocupado",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const votingData = [
  {
    assemblyId: 1,
    votes: [
      { id: 1, name: "¿Aprobar el presupuesto 2024?", votesYes: 120, votesNo: 30, votesAbstain: 6 },
      { id: 2, name: "¿Ratificar al auditor externo?", votesYes: 140, votesNo: 10, votesAbstain: 6 },
      { id: 3, name: "¿Distribuir dividendos?", votesYes: 100, votesNo: 50, votesAbstain: 6 },
      { id: 4, name: "¿Elegir nueva mesa directiva?", votesYes: 150, votesNo: 0, votesAbstain: 6 },
      { id: 5, name: "¿Aprobar el informe anual?", votesYes: 130, votesNo: 20, votesAbstain: 6 },
      { id: 6, name: "¿Invertir en nueva tecnología?", votesYes: 110, votesNo: 40, votesAbstain: 6 },
      { id: 7, name: "¿Expandir a nuevos mercados?", votesYes: 90, votesNo: 60, votesAbstain: 6 },
      { id: 8, name: "¿Implementar políticas de sostenibilidad?", votesYes: 140, votesNo: 10, votesAbstain: 6 },
      { id: 9, name: "¿Donar a organizaciones benéficas?", votesYes: 120, votesNo: 30, votesAbstain: 6 },
      { id: 10, name: "¿Renovar contrato del CEO?", votesYes: 100, votesNo: 50, votesAbstain: 6 },
      { id: 11, name: "¿Aprobar bonos para empleados?", votesYes: 150, votesNo: 0, votesAbstain: 6 },
      { id: 12, name: "¿Comprar nueva flota de vehículos?", votesYes: 130, votesNo: 20, votesAbstain: 6 },
      { id: 13, name: "¿Reducir la jornada laboral?", votesYes: 110, votesNo: 40, votesAbstain: 6 },
      { id: 14, name: "¿Ofrecer más días de vacaciones?", votesYes: 90, votesNo: 60, votesAbstain: 6 },
      { id: 15, name: "¿Crear un programa de bienestar?", votesYes: 140, votesNo: 10, votesAbstain: 6 },
      { id: 16, name: "¿Invertir en formación del personal?", votesYes: 120, votesNo: 30, votesAbstain: 6 },
      { id: 17, name: "¿Mejorar la comunicación interna?", votesYes: 100, votesNo: 50, votesAbstain: 6 },
      { id: 18, name: "¿Modernizar las oficinas?", votesYes: 150, votesNo: 0, votesAbstain: 6 },
      { id: 19, name: "¿Aumentar el presupuesto de marketing?", votesYes: 130, votesNo: 20, votesAbstain: 6 },
      { id: 20, name: "¿Desarrollar nuevos productos?", votesYes: 110, votesNo: 40, votesAbstain: 6 },
    ],
  },
]

export default function DashboardPage() {
  const [createAssemblyOpen, setCreateAssemblyOpen] = useState(false)

  const thisMonthAssemblies = assembliesData.filter((a) => a.status === "Completada").length
  const lastMonthAssemblies = 2
  const totalParticipants = assembliesData.reduce((sum, assembly) => sum + assembly.participants, 0)
  const avgParticipants = Math.round(totalParticipants / assembliesData.length)
  const completedAssemblies = assembliesData.filter((a) => a.status === "Completada").length
  const completionRate = Math.round((completedAssemblies / assembliesData.length) * 100)
  const unassignedAssemblies = assembliesData.filter((a) => !a.coordinatorId && a.status === "Programada")

  const getCoordinator = (coordinatorId) => {
    return coordinatorsData.find((coord) => coord.id === coordinatorId)
  }

  const getVotingResults = (assemblyId) => {
    return votingData.find((voting) => voting.assemblyId === assemblyId)?.votes || []
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        action={{
          label: "Nueva Asamblea",
          onClick: () => setCreateAssemblyOpen(true),
        }}
      />

      <main className="flex-1 overflow-auto p-8">
        {/* Hero Section */}
        <div className="max-w-4xl mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fortalece las relaciones de tus asambleas</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Los contactos se generan automáticamente y facilitan ver con quién te reúnes, revisar notas e historial de
            programación, y programar compromisos de seguimiento.
          </p>

          <div className="flex items-center gap-4 mb-8">
            <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal">
              Aprende más <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 text-base font-medium"
            onClick={() => setCreateAssemblyOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Programa tu primera asamblea
          </Button>

          {unassignedAssemblies.length > 0 && (
            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-orange-800">
                    Tienes {unassignedAssemblies.length} asamblea(s) sin coordinador asignado
                  </h3>
                  <p className="text-orange-700 mt-2">
                    Asigna coordinadores para completar la programación de tus asambleas.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                  >
                    Asignar coordinadores
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white shadow-sm border-0 rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Asambleas este mes</p>
                  <p className="text-3xl font-bold text-gray-900">{thisMonthAssemblies}</p>
                  <div className="flex items-center mt-2">
                    {thisMonthAssemblies > lastMonthAssemblies ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className="text-sm text-gray-500">
                      {Math.abs(thisMonthAssemblies - lastMonthAssemblies)} vs mes anterior
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Participación promedio</p>
                  <p className="text-3xl font-bold text-gray-900">{avgParticipants}</p>
                  <p className="text-sm text-gray-500 mt-2">{totalParticipants} participantes totales</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Tasa de finalización</p>
                  <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
                  <div className="mt-3">
                    <Progress value={completionRate} className="h-2" />
                  </div>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Coordinadores activos</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {coordinatorsData.filter((c) => c.status === "Disponible").length}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">de {coordinatorsData.length} total</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-sm border-0 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Próximas Asambleas</CardTitle>
              <CardDescription className="text-gray-600">Asambleas programadas próximamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assembliesData
                  .filter((a) => a.status === "Programada")
                  .slice(0, 4)
                  .map((assembly) => {
                    const coordinator = getCoordinator(assembly.coordinatorId)
                    return (
                      <div key={assembly.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{assembly.name}</p>
                            <p className="text-sm text-gray-500">
                              {assembly.date} - {assembly.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {coordinator ? (
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={coordinator.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs bg-green-100 text-green-700">
                                  {coordinator.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">{coordinator.name}</span>
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              Sin asignar
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Coordinadores Destacados</CardTitle>
              <CardDescription className="text-gray-600">Mejor rendimiento este mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coordinatorsData
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 4)
                  .map((coordinator, index) => (
                    <div key={coordinator.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={coordinator.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-green-100 text-green-700">
                              {coordinator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center">
                              <Star className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{coordinator.name}</p>
                          <p className="text-sm text-gray-500">{coordinator.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{coordinator.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500">{coordinator.assembliesManaged} asambleas</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <VotingPreview votes={getVotingResults(1)} />
      </main>

      <CreateAssemblyForm open={createAssemblyOpen} onOpenChange={setCreateAssemblyOpen} />
    </>
  )
}
