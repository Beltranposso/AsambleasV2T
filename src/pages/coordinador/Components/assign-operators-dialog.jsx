"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserCheck } from "lucide-react"

export default function AssignOperatorsDialog({ assembly, operators }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <UserCheck className="h-4 w-4 mr-2" />
          Asignar Operadores
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Asignar Operadores - {assembly.name}</DialogTitle>
          <DialogDescription>Seleccione los operadores que trabajarán en esta asamblea</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-4">
            {operators
              .filter((op) => op.estado === "activo")
              .map((operator) => (
                <div key={operator.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={`operator-${operator.id}`}
                    checked={assembly.operadoresAsignados.includes(operator.id)}
                    onCheckedChange={(checked) => {
                      console.log(`Operador ${operator.id} ${checked ? "seleccionado" : "deseleccionado"}`)
                    }}
                  />
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {operator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{operator.name}</p>
                    <p className="text-sm text-gray-600">{operator.email}</p>
                    <p className="text-xs text-gray-500">{operator.asambleasAsignadas.length} asambleas asignadas</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{operator.estado}</Badge>
                </div>
              ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Guardar Asignaciones</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
