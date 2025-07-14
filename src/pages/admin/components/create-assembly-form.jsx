"use client"

import  React from "react"
import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import { Calendar, MapPin, Users, FileText, Monitor, Building, Wifi } from "lucide-react"



export function CreateAssemblyForm({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "",
    modality: "", // Nueva propiedad para modalidad
    expectedParticipants: "",
    duration: "",
    agenda: "",
    virtualLink: "", // Para asambleas virtuales/híbridas
    virtualPlatform: "", // Plataforma virtual
    physicalCapacity: "", // Capacidad física para híbridas
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos de la asamblea:", formData)
    // Aquí iría la lógica para crear la asamblea
    alert("Asamblea creada exitosamente!")
    onOpenChange(false)
    // Resetear formulario
    setFormData({
      name: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "",
      modality: "",
      expectedParticipants: "",
      duration: "",
      agenda: "",
      virtualLink: "",
      virtualPlatform: "",
      physicalCapacity: "",
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getModalityIcon = (modality) => {
    switch (modality) {
      case "presencial":
        return <Building className="h-4 w-4" />
      case "virtual":
        return <Monitor className="h-4 w-4" />
      case "hibrida":
        return <Wifi className="h-4 w-4" />
      default:
        return null
    }
  }

  const getModalityDescription = (modality) => {
    switch (modality) {
      case "presencial":
        return "Todos los participantes asisten físicamente al lugar designado"
      case "virtual":
        return "Todos los participantes se conectan remotamente a través de una plataforma digital"
      case "hibrida":
        return "Algunos participantes asisten físicamente y otros se conectan virtualmente"
      default:
        return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Nueva Asamblea</DialogTitle>
          <DialogDescription className="text-gray-600">
            Completa la información para programar una nueva asamblea
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Información Básica
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre de la Asamblea *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ej: Asamblea General Ordinaria 2024"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe el propósito y objetivos de la asamblea"
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Tipo de Asamblea *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ordinaria">Ordinaria</SelectItem>
                    <SelectItem value="extraordinaria">Extraordinaria</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Modalidad de la Asamblea */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-blue-600" />
              Modalidad de la Asamblea
            </h3>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Selecciona la modalidad *</Label>
              <RadioGroup
                value={formData.modality}
                onValueChange={(value) => handleChange("modality", value)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="presencial" id="presencial" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="presencial" className="flex items-center gap-2 font-medium cursor-pointer">
                      <Building className="h-4 w-4 text-blue-600" />
                      Presencial
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Todos los participantes asisten físicamente al lugar designado
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="virtual" id="virtual" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="virtual" className="flex items-center gap-2 font-medium cursor-pointer">
                      <Monitor className="h-4 w-4 text-green-600" />
                      Virtual
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Todos los participantes se conectan remotamente a través de una plataforma digital
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="hibrida" id="hibrida" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="hibrida" className="flex items-center gap-2 font-medium cursor-pointer">
                      <Wifi className="h-4 w-4 text-purple-600" />
                      Híbrida
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Algunos participantes asisten físicamente y otros se conectan virtualmente
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Configuración específica según modalidad */}
            {(formData.modality === "virtual" || formData.modality === "hibrida") && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-blue-900">Configuración Virtual</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="virtualPlatform" className="text-sm font-medium text-gray-700">
                      Plataforma Virtual *
                    </Label>
                    <Select
                      value={formData.virtualPlatform}
                      onValueChange={(value) => handleChange("virtualPlatform", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="teams">Microsoft Teams</SelectItem>
                        <SelectItem value="meet">Google Meet</SelectItem>
                        <SelectItem value="webex">Cisco Webex</SelectItem>
                        <SelectItem value="other">Otra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="virtualLink" className="text-sm font-medium text-gray-700">
                      Enlace de la Reunión
                    </Label>
                    <Input
                      id="virtualLink"
                      type="url"
                      value={formData.virtualLink}
                      onChange={(e) => handleChange("virtualLink", e.target.value)}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                </div>

                {formData.modality === "hibrida" && (
                  <div>
                    <Label htmlFor="physicalCapacity" className="text-sm font-medium text-gray-700">
                      Capacidad Física Máxima
                    </Label>
                    <Input
                      id="physicalCapacity"
                      type="number"
                      value={formData.physicalCapacity}
                      onChange={(e) => handleChange("physicalCapacity", e.target.value)}
                      placeholder="Número máximo de asistentes presenciales"
                      className="mt-1"
                      min="1"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fecha y Hora */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Fecha y Hora
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Fecha *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                  Hora de Inicio *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                  Duración Estimada
                </Label>
                <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 hora">1 hora</SelectItem>
                    <SelectItem value="1.5 horas">1.5 horas</SelectItem>
                    <SelectItem value="2 horas">2 horas</SelectItem>
                    <SelectItem value="2.5 horas">2.5 horas</SelectItem>
                    <SelectItem value="3 horas">3 horas</SelectItem>
                    <SelectItem value="4 horas">4 horas</SelectItem>
                    <SelectItem value="Día completo">Día completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Ubicación y Participantes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Ubicación y Participantes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(formData.modality === "presencial" || formData.modality === "hibrida") && (
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Ubicación Física *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="Ej: Auditorio Principal, Sala de Juntas"
                    className="mt-1"
                    required={formData.modality === "presencial" || formData.modality === "hibrida"}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="expectedParticipants" className="text-sm font-medium text-gray-700">
                  Participantes Esperados
                </Label>
                <Input
                  id="expectedParticipants"
                  type="number"
                  value={formData.expectedParticipants}
                  onChange={(e) => handleChange("expectedParticipants", e.target.value)}
                  placeholder="Número estimado total"
                  className="mt-1"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Agenda */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Agenda
            </h3>

            <div>
              <Label htmlFor="agenda" className="text-sm font-medium text-gray-700">
                Puntos de la Agenda
              </Label>
              <Textarea
                id="agenda"
                value={formData.agenda}
                onChange={(e) => handleChange("agenda", e.target.value)}
                placeholder="Lista los puntos principales a tratar (uno por línea)"
                className="mt-1 min-h-[100px]"
              />
              <p className="text-xs text-gray-500 mt-1">Ejemplo: Apertura, Informe financiero, Votaciones, Cierre</p>
            </div>
          </div>

          <DialogFooter className="flex gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none">
              Crear Asamblea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
