"use client"

import  React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Building, Tag, X } from "lucide-react"



export function CreateCoordinatorForm({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    bio: "",
    specialties: [],
    newSpecialty: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos del coordinador:", formData)
    // Aquí iría la lógica para crear el coordinador
    alert("Coordinador creado exitosamente!")
    onOpenChange(false)
    // Resetear formulario
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      bio: "",
      specialties: [],
      newSpecialty: "",
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSpecialty = () => {
    if (formData.newSpecialty.trim() && !formData.specialties.includes(formData.newSpecialty.trim())) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, prev.newSpecialty.trim()],
        newSpecialty: "",
      }))
    }
  }

  const removeSpecialty = (specialty) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSpecialty()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Nuevo Coordinador</DialogTitle>
          <DialogDescription className="text-gray-600">
            Completa la información para agregar un nuevo coordinador al equipo
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <User className="h-5 w-5 mr-2 text-green-600" />
              Información Personal
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ej: Dr. María González"
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="coordinador@empresa.com"
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
              </div>
            </div>
          </div>

          {/* Información Profesional */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Building className="h-5 w-5 mr-2 text-green-600" />
              Información Profesional
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                  Departamento *
                </Label>
                <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                    <SelectItem value="Operaciones">Operaciones</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Finanzas">Finanzas</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Tecnología">Tecnología</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
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
                  placeholder="Ej: Gerente, Director, Especialista"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                Biografía/Descripción
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Breve descripción de la experiencia y habilidades del coordinador"
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          {/* Especialidades */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-green-600" />
              Especialidades
            </h3>

            <div>
              <Label htmlFor="newSpecialty" className="text-sm font-medium text-gray-700">
                Agregar Especialidad
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="newSpecialty"
                  type="text"
                  value={formData.newSpecialty}
                  onChange={(e) => handleChange("newSpecialty", e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ej: Gestión de Personal, Resolución de Conflictos"
                  className="flex-1"
                />
                <Button type="button" onClick={addSpecialty} variant="outline" disabled={!formData.newSpecialty.trim()}>
                  Agregar
                </Button>
              </div>
            </div>

            {formData.specialties.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-gray-700">Especialidades Agregadas</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200 pr-1">
                      {specialty}
                      <button
                        type="button"
                        onClick={() => removeSpecialty(specialty)}
                        className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none">
              Crear Coordinador
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
