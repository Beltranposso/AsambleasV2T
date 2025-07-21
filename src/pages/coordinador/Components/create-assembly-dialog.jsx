"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "lucide-react"

export default function CreateAssemblyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4 mr-2" />
          Nueva Asamblea
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Nueva Asamblea</DialogTitle>
          <DialogDescription>Configure los detalles de la nueva asamblea</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="assembly-name">Nombre de la Asamblea</Label>
            <Input id="assembly-name" placeholder="Ej: Asamblea General 2024" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assembly-date">Fecha</Label>
              <Input id="assembly-date" type="date" />
            </div>
            <div>
              <Label htmlFor="assembly-time">Hora</Label>
              <Input id="assembly-time" type="time" />
            </div>
          </div>
          <div>
            <Label htmlFor="assembly-description">Descripción</Label>
            <Textarea id="assembly-description" placeholder="Descripción de la asamblea" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Crear Asamblea</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
