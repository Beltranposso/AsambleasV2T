"use client"

import { useState } from "react"
import { PageHeader } from "../../components/page-header"
import { ParticipantModal } from "./components/participant-modal"

import { AddParticipantForm } from "./components/add-participant-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"
import { Search, Eye, Calendar, Users, CheckCircle, BarChart3 } from "lucide-react"

// Mock data - Participantes únicos por asamblea
const participantsData = [
  {
    id: 1,
    name: "Ana García López",
    email: "ana.garcia@empresa.com",
    phone: "+34 666 111 222",
    position: "Directora Financiera",
    department: "Finanzas",
    avatar: "/placeholder.svg?height=40&width=40",
    assemblies: [
      {
        assemblyId: 1,
        assemblyName: "Asamblea General Ordinaria 2024",
        date: "2024-03-15",
        status: "Asistió",
        role: "Participante" ,
        votingParticipation: 95,
        totalVotes: 20,
        votesInFavor: 15,
        votesAgainst: 3,
        abstentions: 2,
      },
      {
        assemblyId: 2,
        assemblyName: "Asamblea Extraordinaria - Presupuesto",
        date: "2024-02-20",
        status: "Asistió" ,
        role: "Participante",
        votingParticipation: 100,
        totalVotes: 5,
        votesInFavor: 4,
        votesAgainst: 1,
        abstentions: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Carlos López Martín",
    email: "carlos.lopez@empresa.com",
    phone: "+34 666 333 444",
    position: "Gerente de RRHH",
    department: "Recursos Humanos",
    avatar: "/placeholder.svg?height=40&width=40",
    assemblies: [
      {
        assemblyId: 1,
        assemblyName: "Asamblea General Ordinaria 2024",
        date: "2024-03-15",
        status: "Asistió" ,
        role: "Participante",
        votingParticipation: 85,
        totalVotes: 20,
        votesInFavor: 12,
        votesAgainst: 5,
        abstentions: 3,
      },
      {
        assemblyId: 3,
        assemblyName: "Asamblea de Socios Q1",
        date: "2024-04-10",
        status: "Programada" ,
        role: "Observador" ,
        votingParticipation: 0,
        totalVotes: 0,
        votesInFavor: 0,
        votesAgainst: 0,
        abstentions: 0,
      },
    ],
  },
  {
    id: 3,
    name: "María Rodríguez Silva",
    email: "maria.rodriguez@empresa.com",
    phone: "+34 666 555 666",
    position: "Asesora Legal",
    department: "Legal",
    avatar: "/placeholder.svg?height=40&width=40",
    assemblies: [
      {
        assemblyId: 1,
        assemblyName: "Asamblea General Ordinaria 2024",
        date: "2024-03-15",
        status: "No asistió",
        role: "Invitado" ,
        votingParticipation: 0,
        totalVotes: 0,
        votesInFavor: 0,
        votesAgainst: 0,
        abstentions: 0,
      },
      {
        assemblyId: 2,
        assemblyName: "Asamblea Extraordinaria - Presupuesto",
        date: "2024-02-20",
        status: "Asistió",
        role: "Participante",
        votingParticipation: 80,
        totalVotes: 5,
        votesInFavor: 3,
        votesAgainst: 1,
        abstentions: 1,
      },
    ],
  },
  {
    id: 4,
    name: "Juan Martínez Pérez",
    email: "juan.martinez@empresa.com",
    phone: "+34 666 777 888",
    position: "Jefe de Operaciones",
    department: "Operaciones",
    avatar: "/placeholder.svg?height=40&width=40",
    assemblies: [
      {
        assemblyId: 1,
        assemblyName: "Asamblea General Ordinaria 2024",
        date: "2024-03-15",
        status: "Asistió",
        role: "Participante" ,
        votingParticipation: 90,
        totalVotes: 20,
        votesInFavor: 18,
        votesAgainst: 1,
        abstentions: 1,
      },
    ],
  },
  {
    id: 5,
    name: "Laura Fernández Ruiz",
    email: "laura.fernandez@empresa.com",
    phone: "+34 666 999 000",
    position: "Directora de Marketing",
    department: "Marketing",
    avatar: "/placeholder.svg?height=40&width=40",
    assemblies: [
      {
        assemblyId: 3,
        assemblyName: "Asamblea de Socios Q1",
        date: "2024-04-10",
        status: "Programada" ,
        role: "Participante" ,
        votingParticipation: 0,
        totalVotes: 0,
        votesInFavor: 0,
        votesAgainst: 0,
        abstentions: 0,
      },
    ],
  },
]

const assembliesData = [
  { id: 1, name: "Asamblea General Ordinaria 2024", date: "2024-03-15", status: "Completada" },
  { id: 2, name: "Asamblea Extraordinaria - Presupuesto", date: "2024-02-20", status: "Completada" },
  { id: 3, name: "Asamblea de Socios Q1", date: "2024-04-10", status: "Programada" },
]

export default function ParticipantesPage() {
  const [selectedParticipant, setSelectedParticipant] = useState(null)
  const [participantModalOpen, setParticipantModalOpen] = useState(false)
  const [addParticipantOpen, setAddParticipantOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAssembly, setFilterAssembly] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getStatusColor = (status) => {
    switch (status) {
      case "Asistió":
        return "bg-green-50 text-green-700 border-green-200"
      case "No asistió":
        return "bg-red-50 text-red-700 border-red-200"
      case "Programada":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Participante":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Observador":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Invitado":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const handleViewParticipant = (participant) => {
    setSelectedParticipant(participant)
    setParticipantModalOpen(true)
  }

  // Crear lista plana de participaciones para la tabla
  const participationsList = participantsData.flatMap((participant) =>
    participant.assemblies.map((assembly) => ({
      ...participant,
      ...assembly,
      participantId: participant.id,
    })),
  )

  // Filtrar participaciones
  const filteredParticipations = participationsList.filter((participation) => {
    const matchesSearch =
      participation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participation.assemblyName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAssembly = filterAssembly === "all" || participation.assemblyId.toString() === filterAssembly
    const matchesStatus = filterStatus === "all" || participation.status === filterStatus

    return matchesSearch && matchesAssembly && matchesStatus
  })

  // Estadísticas
  const totalParticipants = participantsData.length
  const totalParticipations = participationsList.length
  const attendanceRate = Math.round(
    (participationsList.filter((p) => p.status === "Asistió").length / participationsList.length) * 100,
  )
  const avgVotingParticipation = Math.round(
    participationsList.filter((p) => p.status === "Asistió").reduce((sum, p) => sum + p.votingParticipation, 0) /
      participationsList.filter((p) => p.status === "Asistió").length,
  )

  return (
    <>
      <PageHeader
        title="Participantes"
        description="Gestiona los participantes de las asambleas"
        action={{
          label: "Nuevo Participante",
          onClick: () => setAddParticipantOpen(true),
        }}
      />

      <main className="flex-1 overflow-auto p-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Participantes</p>
                  <p className="text-3xl font-bold text-gray-900">{totalParticipants}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Participaciones</p>
                  <p className="text-3xl font-bold text-gray-900">{totalParticipations}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Tasa de Asistencia</p>
                  <p className="text-3xl font-bold text-gray-900">{attendanceRate}%</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Participación en Votaciones</p>
                  <p className="text-3xl font-bold text-gray-900">{avgVotingParticipation}%</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar participantes..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={filterAssembly} onValueChange={setFilterAssembly}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por asamblea" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las asambleas</SelectItem>
                {assembliesData.map((assembly) => (
                  <SelectItem key={assembly.id} value={assembly.id.toString()}>
                    {assembly.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Asistió">Asistió</SelectItem>
                <SelectItem value="No asistió">No asistió</SelectItem>
                <SelectItem value="Programada">Programada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabla de Participaciones */}
        <Card className="bg-white shadow-sm border-0 rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Participaciones en Asambleas</CardTitle>
            <CardDescription className="text-gray-600">
              {filteredParticipations.length} participaciones encontradas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100">
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Participante</TableHead>
                  <TableHead className="font-semibold text-gray-900">Asamblea</TableHead>
                  <TableHead className="font-semibold text-gray-900">Fecha</TableHead>
                  <TableHead className="font-semibold text-gray-900">Rol</TableHead>
                  <TableHead className="font-semibold text-gray-900">Estado</TableHead>
                  <TableHead className="font-semibold text-gray-900">Participación</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipations.map((participation, index) => (
                  <TableRow
                    key={`${participation.participantId}-${participation.assemblyId}`}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={participation.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                            {participation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{participation.name}</p>
                          <p className="text-sm text-gray-500">{participation.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{participation.assemblyName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900">{participation.date}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(participation.role)} variant="outline">
                        {participation.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(participation.status)} variant="outline">
                        {participation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {participation.status === "Asistió" ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{participation.votingParticipation}%</span>
                          <span className="text-sm text-gray-500">({participation.totalVotes} votos)</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleViewParticipant(participantsData.find((p) => p.id === participation.participantId))
                        }
                        className="bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <ParticipantModal
        open={participantModalOpen}
        onOpenChange={setParticipantModalOpen}
        participant={selectedParticipant}
      />

      <AddParticipantForm open={addParticipantOpen} onOpenChange={setAddParticipantOpen} />
    </>
  )
}
