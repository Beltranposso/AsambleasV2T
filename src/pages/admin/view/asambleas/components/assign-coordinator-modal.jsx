"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../../../components/ui/dialog"
import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import { Textarea } from "../../../../../components/ui/textarea"
import { Badge } from "../../../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Separator } from "../../../../../components/ui/separator"
import { Search, Star, Award, Calendar, Clock, MapPin, Users, Building, Monitor, Wifi, CheckCircle } from "lucide-react"



export function AssignCoordinatorModal({
  open,
  onOpenChange,
  assembly,
  coordinators,
  onAssign,
}) {
  const [selectedCoordinatorId, setSelectedCoordinatorId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [notes, setNotes] = useState("")

  const handleAssign = () => {
    if (selectedCoordinatorId) {
      onAssign(selectedCoordinatorId, notes)
      onOpenChange(false)
      setSelectedCoordinatorId(null)
      setNotes("")
      setSearchTerm("")
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setSelectedCoordinatorId(null)
    setNotes("")
    setSearchTerm("")
  }

  const getModalityIcon = (modality) => {
    switch (modality) {
      case "presencial":
        return <Building className="h-4 w-4 text-blue-600" />
      case "virtual":
        return <Monitor className="h-4 w-4 text-green-600" />
      case "hibrida":
        return <Wifi className="h-4 w-4 text-purple-600" />
      default:
        return <Building className="h-4 w-4 text-gray-600" />
    }
  }

  const availableCoordinators = coordinators.filter((coord) => coord.status === "Disponible")

  const filteredCoordinators = availableCoordinators.filter(
    (coordinator) =>
      coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinator.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinator.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const selectedCoordinator = coordinators.find((coord) => coord.id === selectedCoordinatorId)

  if (!assembly) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Asignar Coordinador</DialogTitle>
          <DialogDescription className="text-gray-600">
            Selecciona un coordinador disponible para gestionar esta asamblea
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Assembly Info */}
          <Card className="bg-gray-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                {getModalityIcon(assembly.modality)}
                {assembly.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{assembly.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{assembly.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{assembly.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{assembly.participants} participantes</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge variant="outline" className="capitalize">
                  {assembly.type}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {assembly.modality}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Buscar Coordinador</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, departamento o especialidad..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Coordinators Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Coordinadores Disponibles ({filteredCoordinators.length})
            </h3>

            {filteredCoordinators.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No se encontraron coordinadores disponibles</p>
                {searchTerm && <p className="text-sm">Intenta con otros términos de búsqueda</p>}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCoordinators.map((coordinator) => (
                  <Card
                    key={coordinator.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCoordinatorId === coordinator.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCoordinatorId(coordinator.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={coordinator.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {coordinator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {selectedCoordinatorId === coordinator.id && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">{coordinator.name}</h4>
                            <Badge className="bg-green-50 text-green-700 border-green-200" variant="outline">
                              {coordinator.status}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">{coordinator.department}</p>

                          <div className="flex items-center gap-4 mb-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span>{coordinator.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="h-3 w-3 text-blue-500" />
                              <span>{coordinator.assembliesManaged} asambleas</span>
                            </div>
                            <span>{coordinator.experience}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {coordinator.specialties.slice(0, 2).map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                            {coordinator.specialties.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{coordinator.specialties.length - 2}
                              </Badge>
                            )}
                          </div>

                          <div className="mt-2 text-xs text-gray-500">
                            <span>Última asamblea: {coordinator.lastAssembly}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Selected Coordinator Details */}
          {selectedCoordinator && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Coordinador Seleccionado</h3>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedCoordinator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                          {selectedCoordinator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900">{selectedCoordinator.name}</h4>
                        <p className="text-gray-600">{selectedCoordinator.department}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{selectedCoordinator.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-blue-500" />
                            <span>{selectedCoordinator.assembliesManaged} asambleas gestionadas</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <p className="text-gray-600">{selectedCoordinator.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Teléfono:</span>
                        <p className="text-gray-600">{selectedCoordinator.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Experiencia:</span>
                        <p className="text-gray-600">{selectedCoordinator.experience}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Última asamblea:</span>
                        <p className="text-gray-600">{selectedCoordinator.lastAssembly}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="font-medium text-gray-700 block mb-2">Especialidades:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedCoordinator.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas Adicionales (Opcional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instrucciones específicas o información adicional para el coordinador..."
                    rows={3}
                  />
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleAssign} disabled={!selectedCoordinatorId} className="bg-blue-600 hover:bg-blue-700">
              Asignar Coordinador
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
