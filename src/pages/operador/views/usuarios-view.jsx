"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { UserTable } from "../../../components/usuarios/user-table"
import { UserDialog } from "../../../components/usuarios/user-dialog"
import { Search, Plus } from "lucide-react"

export function UsuariosView({ usuarios, asambleaName, onToggleAsistencia, onManagePowers }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const filteredUsuarios = usuarios.filter((usuario) => {
    return (
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.cedula.includes(searchTerm)
    )
  })

  const handleEditUser = (user) => {
    setEditingUser(user)
    setIsUserDialogOpen(true)
  }

  const handleNewUser = () => {
    setEditingUser(null)
    setIsUserDialogOpen(true)
  }

  return (
    <>
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <CardHeader className="border-b border-gray-100 pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">Usuarios de {asambleaName}</CardTitle>
          <CardDescription className="text-gray-600">
            Gestiona la asistencia y datos de los usuarios registrados
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Controles */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, email o cédula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button onClick={handleNewUser} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>

          {/* Tabla */}
          <UserTable
            usuarios={filteredUsuarios}
            onEdit={handleEditUser}
            onManagePowers={onManagePowers}
            onToggleAsistencia={onToggleAsistencia}
          />
        </CardContent>
      </Card>

      <UserDialog isOpen={isUserDialogOpen} onClose={() => setIsUserDialogOpen(false)} editingUser={editingUser} />
    </>
  )
}
