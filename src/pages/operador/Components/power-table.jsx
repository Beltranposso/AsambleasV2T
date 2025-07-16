"use client"

import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Edit, Trash2, Shield } from "lucide-react"

export function PowerTable({ poderes, getAsambleaName }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="font-semibold text-gray-700">Poder</TableHead>
            <TableHead className="font-semibold text-gray-700">Otorgante → Representante</TableHead>
            <TableHead className="font-semibold text-gray-700">Detalles</TableHead>
            <TableHead className="font-semibold text-gray-700">Estado</TableHead>
            <TableHead className="font-semibold text-gray-700">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {poderes.map((poder) => (
            <TableRow key={poder.id} className="border-b border-gray-100 hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="font-medium text-sm text-gray-900">Poder #{poder.id}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-50 px-2.5 py-1.5 rounded-md text-xs border border-blue-200">
                      <div className="font-medium text-blue-900">{poder.otorgante}</div>
                      <div className="text-blue-600">ID: {poder.cedulaOtorgante}</div>
                    </div>
                    <div className="text-green-600 font-medium">→</div>
                    <div className="bg-green-50 px-2.5 py-1.5 rounded-md text-xs border border-green-200">
                      <div className="font-medium text-green-900">{poder.representante}</div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs space-y-1">
                  <div className="text-gray-500">Fecha: {poder.fechaOtorgamiento}</div>
                  <div
                    className="bg-gray-50 p-2 rounded text-xs max-w-[200px] truncate border border-gray-200"
                    title={poder.observaciones}
                  >
                    {poder.observaciones}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={`px-2.5 py-1 ${
                    poder.estado === "activo"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {poder.estado}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 text-gray-600 hover:text-blue-700">
                    <Edit className="h-4 w-4" />
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
