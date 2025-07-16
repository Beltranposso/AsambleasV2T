"use client"

import { useState } from "react"
import { PageHeader } from "../../components/page-header"
import { CreateAssemblyForm } from "../../components/create-assembly-form"
import { AssignCoordinatorModal } from "./components/assign-coordinator-modal"
import { AssemblyDetailsModal } from "./components/assembly-details-modal"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import {
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  Clock,
  MapPin,
  Users,
  UserPlus,
  Building,
  Monitor,
  Wifi,
  Link,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog"
import { Alert, AlertDescription } from "../../../../components/ui/alert"

// Mock data con modalidades
const assembliesData = [
  {
    id: 1,
    name: "Asamblea General Ordinaria 2024",
    date: "2024-03-15",
    time: "10:00",
    status: "Completada",
    participants: 156,
    location: "Auditorio Principal",
    type: "Ordinaria",
    modality: "presencial",
    coordinatorId: 1,
    description: "Revisión anual de resultados y aprobación de presupuesto",
    duration: "3 horas",
    agenda: ["Apertura", "Informe financiero", "Votaciones", "Cierre"],
    createdDate: "2024-02-15",
  },
  {
    id: 2,
    name: "Asamblea Virtual - Presupuesto Q2",
    date: "2024-04-20",
    time: "14:30",
    status: "Programada",
    participants: 89,
    location: "Zoom Meeting",
    type: "Extraordinaria",
    modality: "virtual" ,
    virtualPlatform: "Zoom",
    virtualLink: "https://zoom.us/j/123456789",
    coordinatorId: null,
    description: "Aprobación de presupuesto del segundo trimestre",
    duration: "2 horas",
    agenda: ["Presentación propuesta", "Debate", "Votación"],
    createdDate: "2024-03-20",
  },
  {
    id: 3,
    name: "Asamblea Híbrida - Estrategia 2024",
    date: "2024-04-10",
    time: "09:00",
    status: "Programada",
    participants: 203,
    location: "Centro de Convenciones",
    type: "Ordinaria",
    modality: "hibrida" ,
    virtualPlatform: "Microsoft Teams",
    virtualLink: "https://teams.microsoft.com/l/meetup-join/...",
    physicalCapacity: "100",
    coordinatorId: 2,
    description: "Planificación estratégica con participación mixta",
    duration: "4 horas",
    agenda: ["Resultados Q1", "Estrategia Q2", "Nuevos proyectos"],
    createdDate: "2024-03-01",
  },
]

const coordinatorsData = [
  {
    id: 1,
    name: "Dr. María González",
    email: "maria.gonzalez@empresa.com",
    phone: "+34 666 123 456",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Recursos Humanos",
    experience: "5 años",
    assembliesManaged: 12,
    rating: 4.8,
    status: "Disponible",
    specialties: ["Gestión de Personal", "Resolución de Conflictos"],
    lastAssembly: "2024-03-10",
  },
  {
    id: 2,
    name: "Ing. Carlos Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    phone: "+34 666 789 012",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Operaciones",
    experience: "3 años",
    assembliesManaged: 8,
    rating: 4.6,
    status: "Disponible" ,
    specialties: ["Logística", "Procesos"],
    lastAssembly: "2024-03-05",
  },
  {
    id: 3,
    name: "Lic. Ana Martínez",
    email: "ana.martinez@empresa.com",
    phone: "+34 666 345 678",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Legal",
    experience: "7 años",
    assembliesManaged: 15,
    rating: 4.9,
    status: "Ocupado" ,
    specialties: ["Derecho Corporativo", "Compliance"],
    lastAssembly: "2024-03-12",
  },
]

const votingData = [
  {
    assemblyId: 1,
    votes: [
      {
        id: 1,
        topic: "Aprobación del presupuesto 2024",
        inFavor: 89,
        against: 12,
        abstentions: 5,
        total: 106,
        category: "Financiero",
        priority: "high" ,
      },
      {
        id: 2,
        topic: "Renovación del consejo directivo",
        inFavor: 78,
        against: 18,
        abstentions: 10,
        total: 106,
        category: "Administrativo",
        priority: "high" ,
      },
    ],
  },
  {
    assemblyId: 2,
    votes: [],
  },
  {
    assemblyId: 3,
    votes: [],
  },
]

export default function AsambleasPage() {
  const [assemblies, setAssemblies] = useState(assembliesData)
  const [createAssemblyOpen, setCreateAssemblyOpen] = useState(false)
  const [assignCoordinatorOpen, setAssignCoordinatorOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedAssemblyForAssignment, setSelectedAssemblyForAssignment] = useState(null)
  const [selectedAssemblyForDetails, setSelectedAssemblyForDetails] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [assemblyToDelete, setAssemblyToDelete] = useState(null)
  const [notification, setNotification] = useState(null)

  // Función para mostrar notificaciones
  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Programada":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "En Progreso":
        return "bg-green-50 text-green-700 border-green-200"
      case "Completada":
        return "bg-gray-100 text-gray-700 border-gray-300"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getModeIcon = (mode) => {
    switch (mode) {
      case "presencial":
        return <Building className="h-4 w-4" />
      case "virtual":
        return <Monitor className="h-4 w-4" />
      case "hibrida":
        return <Wifi className="h-4 w-4" />
      default:
        return <Building className="h-4 w-4" />
    }
  }

  const getModeColor = (mode) => {
    switch (mode) {
      case "presencial":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "virtual":
        return "bg-green-100 text-green-700 border-green-200"
      case "hibrida":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getCoordinator = (coordinatorId) => {
    if (!coordinatorId) return null
    return coordinatorsData.find((coord) => coord.id === coordinatorId)
  }

  const getVotingResults = (assemblyId) => {
    return votingData.find((voting) => voting.assemblyId === assemblyId)?.votes || []
  }

  const handleViewDetails = (assembly) => {
    setSelectedAssemblyForDetails(assembly)
    setDetailsModalOpen(true)
  }

  const handleAssignCoordinator = (assembly) => {
    setSelectedAssemblyForAssignment(assembly)
    setAssignCoordinatorOpen(true)
  }

  const handleDeleteAssembly = (assembly) => {
    setAssemblyToDelete(assembly)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (assemblyToDelete) {
      setAssemblies((prev) => prev.filter((assembly) => assembly.id !== assemblyToDelete.id))
      showNotification("success", `La asamblea "${assemblyToDelete.name}" ha sido eliminada exitosamente`)
      setDeleteDialogOpen(false)
      setAssemblyToDelete(null)
    }
  }

  const handleAssignCoordinatorComplete = (assemblyId, coordinatorId, notes) => {
    setAssemblies((prev) =>
      prev.map((assembly) => (assembly.id === assemblyId ? { ...assembly, coordinatorId } : assembly)),
    )

    const coordinator = coordinatorsData.find((c) => c.id === coordinatorId)
    showNotification("success", `${coordinator?.name} ha sido asignado exitosamente como coordinador`)
  }

  const filteredAssemblies = assemblies.filter(
    (assembly) =>
      assembly.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assembly.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assembly.modality.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <PageHeader
        title="Gestión de Asambleas"
        description="Administra y supervisa todas las asambleas del sistema"
        action={{
          label: "Nueva Asamblea",
          onClick: () => setCreateAssemblyOpen(true),
        }}
      />

      <main className="flex-1 overflow-auto p-8">
        {/* Notification */}
        {notification && (
          <div className="mb-6">
            <Alert
              className={`border-l-4 ${
                notification.type === "success"
                  ? "border-green-500 bg-green-50"
                  : notification.type === "error"
                    ? "border-red-500 bg-red-50"
                    : "border-blue-500 bg-blue-50"
              }`}
            >
              {notification.type === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
              {notification.type === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
              {notification.type === "info" && <Info className="h-4 w-4 text-blue-600" />}
              <AlertDescription
                className={
                  notification.type === "success"
                    ? "text-green-800"
                    : notification.type === "error"
                      ? "text-red-800"
                      : "text-blue-800"
                }
              >
                {notification.message}
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar asambleas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAssemblies.map((assembly) => {
            const coordinator = getCoordinator(assembly.coordinatorId)
            return (
              <Card key={assembly.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-2">{assembly.name}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStatusColor(assembly.status)}>{assembly.status}</Badge>
                        <Badge className={getModeColor(assembly.modality)} variant="outline">
                          {getModeIcon(assembly.modality)}
                          <span className="ml-1 capitalize">{assembly.modality}</span>
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          {assembly.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Assembly Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {assembly.date} - {assembly.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {assembly.duration}
                    </div>
                    <div className="flex items-center text-gray-600">
                      {assembly.modality === "virtual" ? (
                        <Monitor className="h-4 w-4 mr-2 text-gray-400" />
                      ) : (
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      )}
                      {assembly.location}
                    </div>
                    {assembly.modality === "virtual" && assembly.virtualLink && (
                      <div className="flex items-center text-blue-600">
                        <Link className="h-4 w-4 mr-2" />
                        <a
                          href={assembly.virtualLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline truncate"
                        >
                          Enlace de reunión
                        </a>
                      </div>
                    )}
                    {assembly.modality === "hibrida" && assembly.physicalCapacity && (
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        Capacidad física: {assembly.physicalCapacity}
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {assembly.participants} participantes
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">{assembly.description}</p>

                  {/* Coordinator Info */}
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
                      Coordinador Asignado
                    </div>
                    {coordinator ? (
                      <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={coordinator.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {coordinator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{coordinator.name}</p>
                          <p className="text-xs text-gray-500">{coordinator.department}</p>
                        </div>
                        <Badge className="bg-green-50 text-green-700 border-green-200" variant="outline">
                          {coordinator.status}
                        </Badge>
                      </div>
                    ) : (
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm text-orange-700 font-medium mb-2">Sin coordinador asignado</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                          onClick={() => handleAssignCoordinator(assembly)}
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Asignar coordinador
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewDetails(assembly)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {coordinator && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAssignCoordinator(assembly)}
                        className="text-blue-700 border-blue-200 hover:bg-blue-50 bg-transparent"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAssembly(assembly)}
                      className="text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredAssemblies.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron asambleas</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza creando tu primera asamblea"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setCreateAssemblyOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                Nueva Asamblea
              </Button>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <CreateAssemblyForm open={createAssemblyOpen} onOpenChange={setCreateAssemblyOpen} />

      <AssignCoordinatorModal
        open={assignCoordinatorOpen}
        onOpenChange={setAssignCoordinatorOpen}
        assembly={selectedAssemblyForAssignment}
        coordinators={coordinatorsData}
        onAssign={handleAssignCoordinatorComplete}
      />

      {selectedAssemblyForDetails && (
        <AssemblyDetailsModal
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          assembly={selectedAssemblyForDetails}
          coordinator={getCoordinator(selectedAssemblyForDetails.coordinatorId)}
          votes={getVotingResults(selectedAssemblyForDetails.id)}
          coordinators={coordinatorsData}
          onDelete={(assemblyId) => {
            const assembly = assemblies.find((a) => a.id === assemblyId)
            if (assembly) handleDeleteAssembly(assembly)
          }}
          onAssignCoordinator={handleAssignCoordinatorComplete}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la asamblea "{assemblyToDelete?.name}"? Esta acción no se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar Asamblea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
