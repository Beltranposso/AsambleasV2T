"use client"

import { useState } from "react"
import { PageHeader } from "../../components/page-header"
import { CreateCoordinatorForm } from "../../components/create-coordinator-form"
import { Card, CardContent } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"

import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"
import { Search, Filter, Eye, Settings, UserPlus } from "lucide-react"

// Mock data
const coordinatorsData = [
  {
    id: 1,
    name: "Dr. María González",
    email: "maria.gonzalez@empresa.com",
    phone: "+34 666 123 456",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Recursos Humanos",
    assembliesManaged: 12,
    status: "Disponible",
    joinDate: "2019-03-15",
    specialties: ["Gestión de Personal", "Resolución de Conflictos"],
    lastAssembly: "2024-03-10",
  },
  {
    id: 2,
    name: "Ing. Carlos Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    phone: "+34 666 789 012",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Operaciones",
    assembliesManaged: 8,
    status: "Disponible",
    joinDate: "2021-07-20",
    specialties: ["Logística", "Procesos"],
    lastAssembly: "2024-03-05",
  },
  {
    id: 3,
    name: "Lic. Ana Martínez",
    email: "ana.martinez@empresa.com",
    phone: "+34 666 345 678",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Legal",
    assembliesManaged: 15,
    status: "Ocupado",
    joinDate: "2017-01-10",
    specialties: ["Derecho Corporativo", "Compliance"],
    lastAssembly: "2024-03-12",
  },
]

export default function CoordinadoresPage() {
  const [createCoordinatorOpen, setCreateCoordinatorOpen] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case "Disponible":
        return "bg-green-50 text-green-700 border-green-200"
      case "Ocupado":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <>
      <PageHeader
        title="Coordinadores"
        description="Gestiona tu equipo de coordinadores de asambleas"
        action={{
          label: "Nuevo Coordinador",
          onClick: () => setCreateCoordinatorOpen(true),
        }}
      />

      <main className="flex-1 overflow-auto p-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar coordinadores..." className="pl-10 w-80" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <Card className="bg-white shadow-sm border-0 rounded-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100">
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Coordinador</TableHead>
                  <TableHead className="font-semibold text-gray-900">Departamento</TableHead>
                  <TableHead className="font-semibold text-gray-900">Estado</TableHead>
                  <TableHead className="font-semibold text-gray-900">Asambleas</TableHead>
                  <TableHead className="font-semibold text-gray-900">Última Asamblea</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coordinatorsData.map((coordinator) => (
                  <TableRow key={coordinator.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={coordinator.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-green-100 text-green-700 font-medium">
                            {coordinator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{coordinator.name}</p>
                          <p className="text-sm text-gray-500">{coordinator.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900">{coordinator.department}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(coordinator.status)} variant="outline">
                        {coordinator.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900">{coordinator.assembliesManaged}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{coordinator.lastAssembly}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={coordinator.status === "Ocupado"}
                          className="bg-transparent"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Asignar
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <CreateCoordinatorForm open={createCoordinatorOpen} onOpenChange={setCreateCoordinatorOpen} />
    </>
  )
}
