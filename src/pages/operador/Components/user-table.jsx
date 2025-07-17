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
      presente: { className: "bg-green-100 text-green-700 border-green-200" },
      ausente: { className: "bg-red-100 text-red-700 border-red-200" },
      representado: { className: "bg-blue-100 text-blue-700 border-blue-200" },
      pendiente: { className: "bg-gray-100 text-gray-600 border-gray-200" },
    }

    const config = configs[asistencia] || configs.pendiente

    return (
      <Badge variant="outline" className={`flex items-center gap-1.5 px-2.5 py-1 ${config.className}`}>
        {getAsistenciaIcon(asistencia)}
        <span className="text-xs font-medium capitalize">{asistencia}</span>
      </Badge>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="font-semibold text-gray-700">Usuario</TableHead>
            <TableHead className="font-semibold text-gray-700">Cédula</TableHead>
            <TableHead className="font-semibold text-gray-700">Contacto</TableHead>
            <TableHead className="font-semibold text-gray-700">Asistencia</TableHead>
            <TableHead className="font-semibold text-gray-700">Poderes</TableHead>
            <TableHead className="font-semibold text-gray-700">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50">
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">{usuario.nombre}</div>
                  <div className="text-sm text-gray-500">Reg: {usuario.fechaRegistro}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-mono text-sm bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-md border border-blue-200 inline-block">
                  {usuario.cedula}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="text-gray-900">{usuario.email}</div>
                  <div className="text-gray-500">{usuario.telefono}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {getAsistenciaBadge(usuario.asistencia)}
                  {usuario.asistencia !== "representado" && (
                    <Switch
                      checked={usuario.asistencia === "presente"}
                      onCheckedChange={() => onToggleAsistencia(usuario.id, usuario.asistencia)}
                      className="data-[state=checked]:bg-green-500"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1.5 w-fit ${
                    usuario.poderes > 0
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  <Shield className="h-3 w-3" />
                  {usuario.poderes} poder{usuario.poderes !== 1 ? "es" : ""}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(usuario)}
                    className="hover:bg-blue-50 text-gray-600 hover:text-blue-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onManagePowers(usuario)}
                    className="hover:bg-green-50 text-gray-600 hover:text-green-700"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-red-50 text-gray-600 hover:text-red-700">
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
