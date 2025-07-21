"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Users, UserCheck, Play, Square, Eye, Edit3 } from "lucide-react"
import AssignOperatorsDialog from "./assign-operators-dialog"

export default function AssemblyCard({ assembly, operators, onOpenAssembly }) {
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

  const getOperatorName = (operatorId) => {
    const operator = operators.find((op) => op.id === operatorId)
    return operator ? operator.name : "Operador no encontrado"
  }

  const startAssembly = (assemblyId) => {
    console.log(`Iniciando asamblea ${assemblyId}`)
  }

  const endAssembly = (assemblyId) => {
    console.log(`Finalizando asamblea ${assemblyId}`)
  }

  return (
    <Card className="border-blue-100 hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-gray-900">{assembly.name}</CardTitle>
            <CardDescription className="mt-1">{assembly.description}</CardDescription>
          </div>
          <Badge className={getStatusColor(assembly.status)}>{assembly.status.replace("_", " ")}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {assembly.date}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {assembly.time}
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {assembly.participants} participantes
          </div>
          <div className="flex items-center text-gray-600">
            <UserCheck className="h-4 w-4 mr-2" />
            {assembly.operadoresAsignados.length} operadores
          </div>
        </div>

        {/* Operadores asignados */}
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Operadores Asignados:</Label>
          <div className="flex flex-wrap gap-2">
            {assembly.operadoresAsignados.map((operatorId) => (
              <Badge key={operatorId} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {getOperatorName(operatorId)}
              </Badge>
            ))}
            {assembly.operadoresAsignados.length === 0 && (
              <span className="text-sm text-gray-500 italic">Sin operadores asignados</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {assembly.status === "programada" && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => startAssembly(assembly.id)}>
              <Play className="h-4 w-4 mr-2" />
              Iniciar
            </Button>
          )}
          {assembly.status === "en_curso" && (
            <Button size="sm" variant="destructive" onClick={() => endAssembly(assembly.id)}>
              <Square className="h-4 w-4 mr-2" />
              Finalizar
            </Button>
          )}
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onOpenAssembly(assembly)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Gestionar
          </Button>
          <Button size="sm" variant="outline">
            <Edit3 className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <AssignOperatorsDialog assembly={assembly} operators={operators} />
        </div>
      </CardContent>
    </Card>
  )
}
