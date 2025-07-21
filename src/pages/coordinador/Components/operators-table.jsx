"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit3, Eye } from "lucide-react"
import ManageOperatorAssignmentsDialog from "./manage-operator-assignments-dialog"

export default function OperatorsTable({ operators, assemblies }) {
  const getAssemblyName = (assemblyId) => {
    const assembly = assemblies.find((asm) => asm.id === assemblyId)
    return assembly ? assembly.name : "Asamblea no encontrada"
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Operador</TableHead>
            <TableHead>Cédula/RUT</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Asambleas Asignadas</TableHead>
            <TableHead>Última Actividad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operators.map((operator) => (
            <TableRow key={operator.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {operator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{operator.name}</p>
                    <p className="text-sm text-gray-600">{operator.email}</p>
                    <p className="text-xs text-gray-500">{operator.telefono}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm">{operator.cedula}</span>
              </TableCell>
              <TableCell>
                <Badge
                  className={operator.estado === "activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {operator.estado}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-blue-600">{operator.asambleasAsignadas.length} asambleas</div>
                  <div className="space-y-1">
                    {operator.asambleasAsignadas.map((assemblyId) => (
                      <Badge
                        key={assemblyId}
                        variant="outline"
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {getAssemblyName(assemblyId)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-600">{operator.ultimaActividad}</div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <ManageOperatorAssignmentsDialog operator={operator} assemblies={assemblies} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
