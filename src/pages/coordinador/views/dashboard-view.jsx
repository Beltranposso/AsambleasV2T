"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"
import StatsCards from "../Components/stats-cards"

export default function DashboardView({ assemblies, operators, onOpenAssembly }) {
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
    <div className="space-y-6">
      <StatsCards assemblies={assemblies} operators={operators} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-gray-800">Asambleas Recientes</CardTitle>
            <CardDescription>Últimas asambleas programadas y en curso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assemblies.slice(0, 3).map((assembly) => (
                <div
                  key={assembly.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{assembly.name}</p>
                    <p className="text-sm text-gray-600">
                      {assembly.date} - {assembly.time}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{assembly.participants} participantes</span>
                      <span className="text-xs text-blue-600">{assembly.operadoresAsignados.length} operadores</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(assembly.status)}>{assembly.status.replace("_", " ")}</Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onOpenAssembly(assembly)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-gray-800">Operadores Activos</CardTitle>
            <CardDescription>Estado de los operadores de registro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operators
                .filter((op) => op.estado === "activo")
                .slice(0, 3)
                .map((operator) => (
                  <div key={operator.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {operator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-green-900">{operator.name}</p>
                        <p className="text-sm text-green-700">
                          {operator.asambleasAsignadas.length} asambleas asignadas
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Activo</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
