"use client"

import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Switch } from "../../../components/ui/switch"
import { Edit, UserPlus, Trash2, CheckCircle, XCircle, Shield, Clock } from "lucide-react"

export function UserTable({ usuarios, onEdit, onManagePowers, onToggleAsistencia }) {
  const getAsistenciaIcon = (asistencia) => {
    switch (asistencia) {
      case "presente":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "ausente":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "representado":
        return <Shield className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getAsistenciaBadge = (asistencia) => {
    const configs = {
      presente: { 
        className: "bg-green-100 text-green-700 border-green-300 font-medium",
        icon: <CheckCircle className="h-3.5 w-3.5" />
      },
      ausente: { 
        className: "bg-red-100 text-red-700 border-red-300 font-medium",
        icon: <XCircle className="h-3.5 w-3.5" />
      },
      representado: { 
        className: "bg-blue-100 text-blue-700 border-blue-300 font-medium",
        icon: <Shield className="h-3.5 w-3.5" />
      },
      pendiente: { 
        className: "bg-gray-100 text-gray-600 border-gray-300 font-medium",
        icon: <Clock className="h-3.5 w-3.5" />
      },
    }

    const config = configs[asistencia] || configs.pendiente

    return (
      <Badge variant="outline" className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full ${config.className}`}>
        {config.icon}
        <span className="capitalize">{asistencia}</span>
      </Badge>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80 border-b border-gray-200 hover:bg-gray-50/80">
            <TableHead className="font-semibold text-gray-800 text-sm py-4">Usuario</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4">Cédula</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4">Contacto</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4">Asistencia</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4">Poderes</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <TableCell className="py-4">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{usuario.nombre}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Reg: {usuario.fechaRegistro}</div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="font-mono text-sm bg-blue-50 text-blue-800 px-3 py-1.5 rounded-md border border-blue-200 inline-block font-medium">
                  {usuario.cedula}
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="text-sm">
                  <div className="text-gray-900 font-medium">{usuario.email}</div>
                  <div className="text-gray-500 mt-0.5">{usuario.telefono}</div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  {getAsistenciaBadge(usuario.asistencia)}
                  {usuario.asistencia !== "representado" && (
                    <Switch
                      checked={usuario.asistencia === "presente"}
                      onCheckedChange={() => onToggleAsistencia(usuario.id, usuario.asistencia)}
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4">
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1.5 w-fit px-3 py-1.5 text-sm rounded-full font-medium ${
                    usuario.poderes > 0
                      ? "bg-green-50 text-green-700 border-green-300"
                      : "bg-gray-50 text-gray-500 border-gray-300"
                  }`}
                >
                  <Shield className="h-3.5 w-3.5" />
                  {usuario.poderes} poder{usuario.poderes !== 1 ? "es" : ""}
                </Badge>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(usuario)}
                    className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onManagePowers(usuario)}
                    className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}