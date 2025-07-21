"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Play, Users, UserCheck } from "lucide-react"

export default function StatsCards({ assemblies, operators }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Total Asambleas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-900">{assemblies.length}</div>
          <p className="text-blue-700 text-sm">Asambleas registradas</p>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-800 flex items-center">
            <Play className="h-5 w-5 mr-2" />
            En Curso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-900">
            {assemblies.filter((a) => a.status === "en_curso").length}
          </div>
          <p className="text-green-700 text-sm">Asambleas activas</p>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-purple-800 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Participantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-900">
            {assemblies.reduce((total, assembly) => total + assembly.participants, 0)}
          </div>
          <p className="text-purple-700 text-sm">Total registrados</p>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-orange-800 flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Operadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-900">
            {operators.filter((op) => op.estado === "activo").length}
          </div>
          <p className="text-orange-700 text-sm">Operadores activos</p>
        </CardContent>
      </Card>
    </div>
  )
}
