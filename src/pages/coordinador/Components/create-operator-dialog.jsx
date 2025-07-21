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
import { UserPlus } from "lucide-react"

export default function CreateOperatorDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Nuevo Operador
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Operador</DialogTitle>
          <DialogDescription>Complete la información del nuevo operador de registro</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 space-y-4">
          <div className="col-span-2">
            <Label htmlFor="operator-name">Nombre Completo</Label>
            <Input id="operator-name" placeholder="Nombre del operador" />
          </div>
          <div>
            <Label htmlFor="operator-email">Email</Label>
            <Input id="operator-email" type="email" placeholder="email@example.com" />
          </div>
          <div>
            <Label htmlFor="operator-phone">Teléfono</Label>
            <Input id="operator-phone" placeholder="+56 9 1234 5678" />
          </div>
          <div>
            <Label htmlFor="operator-cedula">Cédula/RUT</Label>
            <Input id="operator-cedula" placeholder="12.345.678-9" />
          </div>
          <div>
            <Label htmlFor="operator-password">Contraseña Temporal</Label>
            <Input id="operator-password" type="password" placeholder="Contraseña inicial" />
          </div>
          <div className="col-span-2">
            <Label htmlFor="operator-notes">Notas Adicionales</Label>
            <Textarea id="operator-notes" placeholder="Información adicional sobre el operador" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button className="bg-green-600 hover:bg-green-700">Crear Operador</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
