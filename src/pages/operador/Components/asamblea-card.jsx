"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function AsambleaCard({ asamblea, onClick }) {
  return (
    <Card
      className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300 rounded-xl"
      onClick={() => onClick(asamblea.id)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">{asamblea.nombre}</CardTitle>
          <Badge
            className={`ml-2 px-2.5 py-1 ${
              asamblea.estado === "activa"
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {asamblea.estado}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Información de la asamblea */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="font-medium">
              {asamblea.fecha} • {asamblea.hora}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-green-500" />
            <span>{asamblea.lugar}</span>
          </div>
        </div>

        {/* Estadísticas de asistencia */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Asistencia</span>
            <span className="text-sm text-gray-500">
              {asamblea.asistentes}/{asamblea.totalUsuarios}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(asamblea.asistentes / asamblea.totalUsuarios) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Resumen numérico */}
        <div className="flex justify-between">
          <div className="text-center">
            <div className="text-xl font-semibold text-green-600">{asamblea.asistentes}</div>
            <div className="text-xs text-gray-500 font-medium">Presentes</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold text-blue-600">{asamblea.totalUsuarios - asamblea.asistentes}</div>
            <div className="text-xs text-gray-500 font-medium">Pendientes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
