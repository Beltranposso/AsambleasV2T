"use client"

import  React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../../components/ui/dialog"
import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../components/ui/select"
import { Textarea } from "../../../../../components/ui/textarea"
import { Badge } from "../../../../../components/ui/badge"
import { User, Mail, Phone, UserPlus, X, Users } from "lucide-react" // Added Users import



export function AddParticipantForm({ open, onOpenChange, assemblyId, assemblyName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    role: "",
    notes: "",
    existingParticipant: false,
  })

  const [selectedParticipants, setSelectedParticipants] = useState([])

  // Mock existing participants
  const existingParticipants = [
    { id: 1, name: "Ana García", email: "ana.garcia@empresa.com", department: "Finanzas" },
    { id: 2, name: "Carlos López", email: "carlos.lopez@empresa.com", department: "RRHH" },
    { id: 3, name: "María Rodríguez", email: "maria.rodriguez@empresa.com", department: "Legal" },
    { id: 4, name: "Juan Martínez", email: "juan.martinez@empresa.com", department: "Operaciones" },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.existingParticipant && selectedParticipants.length > 0) {
      console.log("Agregando participantes existentes:", selectedParticipants, "a asamblea:", assemblyId)
      alert(`${selectedParticipants.length} participante(s) agregado(s) a ${assemblyName}`)
    } else if (!formData.existingParticipant && formData.name && formData.email) {
      console.log("Creando nuevo participante:", formData, "para asamblea:", assemblyId)
      alert(`Nuevo participante ${formData.name} agregado a ${assemblyName}`)
    }

    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      role: "",
      notes: "",
      existingParticipant: false,
    })
    setSelectedParticipants([])
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleParticipant = (participantId) => {
    setSelectedParticipants((prev) =>
      prev.includes(participantId) ? prev.filter((id) => id !== participantId) : [...prev, participantId],
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center">
            <UserPlus className="h-6 w-6 mr-2 text-green-600" />
            Agregar Participante
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {assemblyName ? `Agregar participante a: ${assemblyName}` : "Agregar nuevo participante al sistema"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Participante */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Tipo de Participante</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={!formData.existingParticipant ? "default" : "outline"}
                onClick={() => handleChange("existingParticipant", false)}
                className="flex-1"
              >
                Nuevo Participante
              </Button>
              <Button
                type="button"
                variant={formData.existingParticipant ? "default" : "outline"}
                onClick={() => handleChange("existingParticipant", true)}
                className="flex-1"
              >
                Participante Existente
              </Button>
            </div>
          </div>

          {/* Formulario para Nuevo Participante */}
          {!formData.existingParticipant && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Información del Participante
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nombre Completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Ej: Ana García López"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Correo Electrónico *
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="participante@empresa.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Teléfono
                  </Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+34 666 123 456"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                    Cargo/Posición
                  </Label>
                  <Input
                    id="position"
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    placeholder="Ej: Gerente, Director, Analista"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                    Departamento
                  </Label>
                  <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Finanzas">Finanzas</SelectItem>
                      <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Operaciones">Operaciones</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Tecnología">Tecnología</SelectItem>
                      <SelectItem value="Administración">Administración</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                    Rol en la Asamblea *
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Participante">Participante</SelectItem>
                      <SelectItem value="Observador">Observador</SelectItem>
                      <SelectItem value="Invitado">Invitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Notas Adicionales
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Información adicional sobre el participante..."
                  className="mt-1 min-h-[80px]"
                />
              </div>
            </div>
          )}

          {/* Selección de Participantes Existentes */}
          {formData.existingParticipant && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" /> {/* Fixed undeclared variable error */}
                Seleccionar Participantes Existentes
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto border rounded-lg p-3">
                {existingParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedParticipants.includes(participant.id.toString())
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleParticipant(participant.id.toString())}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          selectedParticipants.includes(participant.id.toString())
                            ? "bg-green-600 border-green-600"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedParticipants.includes(participant.id.toString()) && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{participant.name}</p>
                        <p className="text-sm text-gray-500">{participant.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {participant.department}
                    </Badge>
                  </div>
                ))}
              </div>

              {selectedParticipants.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Participantes Seleccionados ({selectedParticipants.length})
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedParticipants.map((participantId) => {
                      const participant = existingParticipants.find((p) => p.id.toString() === participantId)
                      return (
                        <Badge
                          key={participantId}
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 pr-1"
                        >
                          {participant?.name}
                          <button
                            type="button"
                            onClick={() => toggleParticipant(participantId)}
                            className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="role-existing" className="text-sm font-medium text-gray-700">
                  Rol en la Asamblea *
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona rol para todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Participante">Participante</SelectItem>
                    <SelectItem value="Observador">Observador</SelectItem>
                    <SelectItem value="Invitado">Invitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none"
              disabled={
                (!formData.existingParticipant && (!formData.name || !formData.email || !formData.role)) ||
                (formData.existingParticipant && (selectedParticipants.length === 0 || !formData.role))
              }
            >
              {formData.existingParticipant
                ? `Agregar ${selectedParticipants.length} Participantes`
                : "Crear Participante"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
