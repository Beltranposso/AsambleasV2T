"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield } from "lucide-react"

export default function ManageOperatorAssignmentsDialog({ operator, assemblies }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "programada":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "en_curso":
        return "bg-green-100 text-green-800 border-green-200"
      case "finalizada":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Shield className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar Asignaciones - {operator.name}</DialogTitle>
          <DialogDescription>Asigne o desasigne asambleas para este operador</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {assemblies.map((assembly) => (
            <div key={assembly.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox
                id={`assembly-${assembly.id}`}
                checked={operator.asambleasAsignadas.includes(assembly.id)}
                onCheckedChange={(checked) => {
                  console.log(
                    `Asamblea ${assembly.id} ${checked ? "asignada" : "desasignada"} a operador ${operator.id}`,
                  )
                }}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{assembly.name}</p>
                <p className="text-sm text-gray-600">
                  {assembly.date} - {assembly.time}
                </p>
                <Badge className={getStatusColor(assembly.status)}>{assembly.status.replace("_", " ")}</Badge>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button className="bg-green-600 hover:bg-green-700">Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
