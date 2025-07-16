"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function UserDialog({ isOpen, onClose, editingUser }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editingUser ? "Modifica los datos del usuario seleccionado" : "Ingresa los datos del nuevo usuario"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                Nombre completo
              </Label>
              <Input
                id="nombre"
                defaultValue={editingUser?.nombre || ""}
                placeholder="Nombre y apellidos"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cedula" className="text-sm font-medium text-gray-700">
                Cédula
              </Label>
              <Input
                id="cedula"
                defaultValue={editingUser?.cedula || ""}
                placeholder="Número de cédula"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={editingUser?.email || ""}
              placeholder="correo@ejemplo.com"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-sm font-medium text-gray-700">
              Teléfono
            </Label>
            <Input
              id="telefono"
              defaultValue={editingUser?.telefono || ""}
              placeholder="+34 600 000 000"
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            Cancelar
          </Button>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            {editingUser ? "Guardar Cambios" : "Crear Usuario"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
