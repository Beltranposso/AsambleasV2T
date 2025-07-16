"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../../../components/ui/dialog"
import { Button } from "../../../../../components/ui/button"
import { Badge } from "../../../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar"
import { Separator } from "../../../../../components/ui/separator"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  FileText,
  User,
  Edit,
  Trash2,
  QrCode,
  Vote,
  AlertTriangle,
  UserPlus,
  Monitor,
  Building,
  Wifi,
} from "lucide-react"
import { VotingPreview } from "../../../components/voting-preview"
import { AssignCoordinatorModal } from "./assign-coordinator-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../../components/ui/alert-dialog"




export function AssemblyDetailsModal({
  open,
  onOpenChange,
  assembly,
  coordinator,
  votes,
  coordinators,
  onDelete,
  onAssignCoordinator,
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)

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

  const getTypeColor = (type) => {
    switch (type) {
      case "Ordinaria":
        return "bg-green-50 text-green-700 border-green-200"
      case "Extraordinaria":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "Urgente":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getModalityInfo = (modality) => {
    switch (modality) {
      case "presencial":
        return { icon: Building, color: "text-blue-600", label: "Presencial" }
      case "virtual":
        return { icon: Monitor, color: "text-green-600", label: "Virtual" }
      case "hibrida":
        return { icon: Wifi, color: "text-purple-600", label: "Híbrida" }
      default:
        return { icon: Building, color: "text-gray-600", label: "No especificada" }
    }
  }

  const handleDelete = () => {
    onDelete(assembly.id)
    setShowDeleteDialog(false)
    onOpenChange(false)
  }

  const openQRPage = () => {
    window.open(`/asambleas/${assembly.id}/qr`, "_blank")
  }

  const modalityInfo = getModalityInfo(assembly.modality)
  const ModalityIcon = modalityInfo.icon

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">{assembly.name}</DialogTitle>
                <DialogDescription className="text-gray-600">{assembly.description}</DialogDescription>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge className={getStatusColor(assembly.status)} variant="outline">
                  {assembly.status}
                </Badge>
                <Badge className={getTypeColor(assembly.type)} variant="outline">
                  {assembly.type}
                </Badge>
                <Badge variant="outline" className={`${modalityInfo.color} border-current`}>
                  <ModalityIcon className="h-3 w-3 mr-1" />
                  {modalityInfo.label}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Información Básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Fecha y Hora
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Fecha:</span>
                    <span>{assembly.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Hora:</span>
                    <span>{assembly.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Duración:</span>
                    <span>{assembly.duration}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <ModalityIcon className={`h-5 w-5 ${modalityInfo.color}`} />
                  Modalidad y Ubicación
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <ModalityIcon className={`h-4 w-4 ${modalityInfo.color}`} />
                    <span className="font-medium">Modalidad:</span>
                    <span>{modalityInfo.label}</span>
                  </div>

                  {(assembly.modality === "presencial" || assembly.modality === "hibrida") && assembly.location && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Lugar:</span>
                      <span>{assembly.location}</span>
                    </div>
                  )}

                  {(assembly.modality === "virtual" || assembly.modality === "hibrida") && assembly.virtualPlatform && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Monitor className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Plataforma:</span>
                      <span>{assembly.virtualPlatform}</span>
                    </div>
                  )}

                  {assembly.virtualLink && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-medium">Enlace:</span>
                      <a
                        href={assembly.virtualLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        {assembly.virtualLink}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Participantes:</span>
                    <span>{assembly.participants}</span>
                  </div>

                  {assembly.modality === "hibrida" && assembly.physicalCapacity && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Capacidad física:</span>
                      <span>{assembly.physicalCapacity}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Coordinador */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Coordinador Asignado
              </h3>

              {coordinator ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={coordinator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {coordinator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{coordinator.name}</p>
                        <p className="text-sm text-gray-600">{coordinator.department}</p>
                      </div>
                      <Badge className="bg-green-50 text-green-700 border-green-200" variant="outline">
                        {coordinator.status}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAssignModal(true)}
                      className="bg-transparent"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Cambiar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-700">
                      <AlertTriangle className="h-5 w-5" />
                      <div>
                        <span className="font-medium">Sin coordinador asignado</span>
                        <p className="text-sm text-orange-600 mt-1">
                          Esta asamblea necesita un coordinador para su gestión adecuada.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowAssignModal(true)}
                      className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Asignar Coordinador
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Votaciones */}
            {votes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Vote className="h-5 w-5 text-blue-600" />
                  Resultados de Votaciones
                </h3>
                <VotingPreview votes={votes} assemblyName={assembly.name} maxPreview={5} />
              </div>
            )}

            {/* Descripción Detallada */}
            {assembly.description && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Descripción
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{assembly.description}</p>
                  </div>
                </div>
              </>
            )}

            {/* Acciones */}
            <Separator />
            <div className="flex flex-wrap gap-3 pt-4">
              <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                Editar Asamblea
              </Button>

              <Button variant="outline" onClick={openQRPage} className="flex-1 sm:flex-none bg-transparent">
                <QrCode className="h-4 w-4 mr-2" />
                Sistema QR
              </Button>

              {assembly.status === "Completada" && votes.length > 0 && (
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none text-green-700 border-green-200 hover:bg-green-50 bg-transparent"
                >
                  <Vote className="h-4 w-4 mr-2" />
                  Ver Votaciones
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(true)}
                className="flex-1 sm:flex-none text-red-700 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Coordinator Modal */}
      <AssignCoordinatorModal
        open={showAssignModal}
        onOpenChange={setShowAssignModal}
        assembly={assembly}
        coordinators={coordinators}
        onAssign={onAssignCoordinator}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              ¿Eliminar Asamblea?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Estás a punto de eliminar permanentemente la asamblea <strong>"{assembly.name}"</strong>.
              </p>
              <p className="text-red-600 font-medium">
                Esta acción no se puede deshacer y se perderán todos los datos asociados:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Información de la asamblea</li>
                <li>Registros de participantes</li>
                <li>Resultados de votaciones</li>
                <li>Archivos y documentos relacionados</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Sí, Eliminar Asamblea
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
