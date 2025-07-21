"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Users,
  Vote,
  Settings,
  UserPlus,
  Edit3,
  Eye,
  Info,
  Square,
  Play,
  Calendar,
  Clock,
  Monitor,
  ExternalLink,
} from "lucide-react"
import ProjectionView from "./projection-view"

export default function  AssemblyDetailProps {
  assembly: any
  onBack: () => void
};

export default function AssemblyDetail({ assembly, onBack } ) {
  const [activeTab, setActiveTab] = useState("info")
  const [showProjection, setShowProjection] = useState(false)
  const [customVotingOptions, setCustomVotingOptions] = useState(["Opción 1", "Opción 2"])
  const [votingType, setVotingType] = useState("standard")

  // Mock data específica para esta asamblea con más información
  const users = [
    {
      id: 1,
      name: "María González",
      email: "maria@example.com",
      cedula: "12.345.678-9",
      propiedad: "Apartamento 101",
      coeficiente: "15.5%",
      role: "Asambleísta",
      coefficient: 1.0,
      status: "activo",
      telefono: "+56 9 1234 5678",
      fechaRegistro: "2024-01-10",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      cedula: "98.765.432-1",
      propiedad: "Casa 205",
      coeficiente: "8.2%",
      role: "Operador",
      coefficient: 0.5,
      status: "activo",
      telefono: "+56 9 8765 4321",
      fechaRegistro: "2024-01-08",
    },
    {
      id: 3,
      name: "Ana Martínez",
      email: "ana@example.com",
      cedula: "11.222.333-4",
      propiedad: "Local Comercial A",
      coeficiente: "22.1%",
      role: "Votante",
      coefficient: 1.5,
      status: "inactivo",
      telefono: "+56 9 1122 3344",
      fechaRegistro: "2024-01-05",
    },
    {
      id: 4,
      name: "Pedro Silva",
      email: "pedro@example.com",
      cedula: "55.666.777-8",
      propiedad: "Apartamento 302",
      coeficiente: "12.8%",
      role: "Asambleísta",
      coefficient: 1.2,
      status: "activo",
      telefono: "+56 9 5566 7788",
      fechaRegistro: "2024-01-12",
    },
    {
      id: 5,
      name: "Laura Fernández",
      email: "laura@example.com",
      cedula: "33.444.555-6",
      propiedad: "Estacionamiento 15",
      coeficiente: "3.2%",
      role: "Votante",
      coefficient: 0.8,
      status: "activo",
      telefono: "+56 9 3344 5566",
      fechaRegistro: "2024-01-15",
    },
  ]

  const votings = [
    {
      id: 1,
      title: "Aprobación del presupuesto 2024",
      status: "activa",
      votes: { favor: 15, contra: 3, abstencion: 2 },
      total: 20,
    },
    {
      id: 2,
      title: "Modificación de estatutos",
      status: "finalizada",
      votes: { favor: 18, contra: 7, abstencion: 3 },
      total: 28,
    },
  ]

  const getStatusColor = (status: string) => {
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

  const openProjection = () => {
    setShowProjection(true)
  }

  const closeProjection = () => {
    setShowProjection(false)
  }

  // Si está en modo proyección, mostrar la vista de proyección
  if (showProjection) {
    return <ProjectionView assembly={assembly} onBack={closeProjection} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{assembly.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {assembly.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {assembly.time}
                  </span>
                  <Badge className={getStatusColor(assembly.status)}>{assembly.status.replace("_", " ")}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={openProjection} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Monitor className="h-4 w-4 mr-2" />
                Abrir Proyección
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-blue-100 text-blue-700">CO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-blue-100 rounded-lg p-1">
            <TabsTrigger value="info" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <Info className="h-4 w-4 mr-2" />
              Información
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <Users className="h-4 w-4 mr-2" />
              Participantes
            </TabsTrigger>
            <TabsTrigger
              value="voting"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              <Vote className="h-4 w-4 mr-2" />
              Votaciones
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </TabsTrigger>
          </TabsList>

          {/* Information Tab */}
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Detalles de la Asamblea</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Descripción</Label>
                      <p className="mt-1 text-gray-900">{assembly.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Fecha y Hora</Label>
                        <p className="mt-1 text-gray-900">
                          {assembly.date} a las {assembly.time}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Estado</Label>
                        <div className="mt-1">
                          <Badge className={getStatusColor(assembly.status)}>{assembly.status.replace("_", " ")}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Participantes Registrados</Label>
                        <p className="mt-1 text-2xl font-bold text-blue-600">{assembly.participants}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Votaciones Activas</Label>
                        <p className="mt-1 text-2xl font-bold text-green-600">{assembly.activeVotings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Acciones Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {assembly.status === "programada" && (
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar Asamblea
                      </Button>
                    )}
                    {assembly.status === "en_curso" && (
                      <Button className="w-full" variant="destructive">
                        <Square className="h-4 w-4 mr-2" />
                        Finalizar Asamblea
                      </Button>
                    )}
                    <Button onClick={openProjection} className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Monitor className="h-4 w-4 mr-2" />
                      Abrir Proyección
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Editar Información
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Reportes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Participantes de la Asamblea</h2>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Agregar Participante
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Agregar Participante</DialogTitle>
                      <DialogDescription>Agregue un nuevo participante a esta asamblea</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 space-y-4">
                      <div className="col-span-2">
                        <Label htmlFor="user-name">Nombre Completo</Label>
                        <Input id="user-name" placeholder="Nombre del participante" />
                      </div>
                      <div>
                        <Label htmlFor="user-email">Email</Label>
                        <Input id="user-email" type="email" placeholder="email@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="user-phone">Teléfono</Label>
                        <Input id="user-phone" placeholder="+56 9 1234 5678" />
                      </div>
                      <div>
                        <Label htmlFor="user-cedula">Cédula/RUT</Label>
                        <Input id="user-cedula" placeholder="12.345.678-9" />
                      </div>
                      <div>
                        <Label htmlFor="user-propiedad">Propiedad</Label>
                        <Input id="user-propiedad" placeholder="Apartamento 101" />
                      </div>
                      <div>
                        <Label htmlFor="user-coeficiente-porcentaje">Coeficiente (%)</Label>
                        <Input id="user-coeficiente-porcentaje" placeholder="15.5%" />
                      </div>
                      <div>
                        <Label htmlFor="user-role">Rol</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asambleista">Asambleísta</SelectItem>
                            <SelectItem value="votante">Votante</SelectItem>
                            <SelectItem value="operador">Operador de Registro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-green-600 hover:bg-green-700">Agregar Participante</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-gray-800">Lista de Participantes</CardTitle>
                <CardDescription>Usuarios registrados para esta asamblea</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Participante</TableHead>
                        <TableHead>Cédula/RUT</TableHead>
                        <TableHead>Propiedad</TableHead>
                        <TableHead>Coeficiente</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-xs text-gray-500">{user.telefono}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-sm">{user.cedula}</span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{user.propiedad}</p>
                              <p className="text-xs text-gray-500">Registrado: {user.fechaRegistro}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <div className="font-bold text-lg text-blue-600">{user.coeficiente}</div>
                              <div className="text-xs text-gray-500">Factor: {user.coefficient}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === "activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Voting Tab */}
          <TabsContent value="voting" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Votaciones de la Asamblea</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Vote className="h-4 w-4 mr-2" />
                    Nueva Votación
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Votación</DialogTitle>
                    <DialogDescription>Configure los parámetros de la votación para esta asamblea</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="voting-title">Título de la Votación</Label>
                      <Input id="voting-title" placeholder="Ej: Aprobación del presupuesto" />
                    </div>
                    <div>
                      <Label htmlFor="voting-description">Descripción</Label>
                      <Textarea id="voting-description" placeholder="Descripción detallada de la votación" />
                    </div>

                    <div>
                      <Label>Tipo de Votación</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <Card
                          className={`cursor-pointer border-2 ${votingType === "standard" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                          onClick={() => setVotingType("standard")}
                        >
                          <CardContent className="p-4 text-center">
                            <Vote className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <h3 className="font-medium">Votación Estándar</h3>
                            <p className="text-sm text-gray-600">A favor / En contra / Abstención</p>
                          </CardContent>
                        </Card>
                        <Card
                          className={`cursor-pointer border-2 ${votingType === "custom" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
                          onClick={() => setVotingType("custom")}
                        >
                          <CardContent className="p-4 text-center">
                            <Settings className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                            <h3 className="font-medium">Votación Personalizada</h3>
                            <p className="text-sm text-gray-600">Opciones múltiples personalizadas</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {votingType === "standard" && (
                      <div>
                        <Label htmlFor="voting-majority">Tipo de Mayoría</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">Mayoría Simple (50% + 1)</SelectItem>
                            <SelectItem value="qualified">Mayoría Calificada (2/3)</SelectItem>
                            <SelectItem value="unanimous">Unanimidad (100%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {votingType === "custom" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label>Opciones de Votación</Label>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setCustomVotingOptions([
                                ...customVotingOptions,
                                `Opción ${customVotingOptions.length + 1}`,
                              ])
                            }
                          >
                            + Agregar Opción
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {customVotingOptions.map((option, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...customVotingOptions]
                                  newOptions[index] = e.target.value
                                  setCustomVotingOptions(newOptions)
                                }}
                                placeholder={`Opción ${index + 1}`}
                              />
                              {customVotingOptions.length > 2 && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const newOptions = customVotingOptions.filter((_, i) => i !== index)
                                    setCustomVotingOptions(newOptions)
                                  }}
                                >
                                  ✕
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="allow-blank" className="rounded" />
                          <Label htmlFor="allow-blank" className="text-sm">
                            Permitir voto en blanco
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="multiple-selection" className="rounded" />
                          <Label htmlFor="multiple-selection" className="text-sm">
                            Permitir selección múltiple
                          </Label>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="voting-duration">Duración (minutos)</Label>
                        <Input id="voting-duration" type="number" defaultValue="30" />
                      </div>
                      <div>
                        <Label htmlFor="voting-quorum">Quórum requerido (%)</Label>
                        <Input id="voting-quorum" type="number" defaultValue="50" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">Crear Votación</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {votings.map((voting) => (
                <Card key={voting.id} className="border-purple-100">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-gray-900">{voting.title}</CardTitle>
                      <Badge
                        className={
                          voting.status === "activa" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {voting.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-700">{voting.votes.favor}</div>
                          <div className="text-sm text-green-600">A Favor</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-700">{voting.votes.contra}</div>
                          <div className="text-sm text-red-600">En Contra</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-700">{voting.votes.abstencion}</div>
                          <div className="text-sm text-yellow-600">Abstención</div>
                        </div>
                      </div>
                      <Progress value={(voting.votes.favor / voting.total) * 100} className="h-3" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Total de votos: {voting.total}</span>
                        <span>
                          Participación:{" "}
                          {(
                            ((voting.votes.favor + voting.votes.contra + voting.votes.abstencion) / voting.total) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      {voting.status === "activa" && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="destructive">
                            <Square className="h-4 w-4 mr-2" />
                            Finalizar Votación
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver en Tiempo Real
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Configuración de la Asamblea</h2>

            <div className="grid gap-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-gray-800">Configuración de Coeficientes</CardTitle>
                  <CardDescription>Coeficientes de voto específicos para esta asamblea</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="coef-asambleista">Asambleísta</Label>
                      <Input id="coef-asambleista" type="number" step="0.1" defaultValue="1.0" />
                    </div>
                    <div>
                      <Label htmlFor="coef-votante">Votante</Label>
                      <Input id="coef-votante" type="number" step="0.1" defaultValue="0.5" />
                    </div>
                    <div>
                      <Label htmlFor="coef-operador">Operador</Label>
                      <Input id="coef-operador" type="number" step="0.1" defaultValue="0.3" />
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Guardar Coeficientes</Button>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-gray-800">Configuración de Votaciones</CardTitle>
                  <CardDescription>Parámetros para las votaciones de esta asamblea</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quorum">Quórum Mínimo (%)</Label>
                      <Input id="quorum" type="number" defaultValue="50" />
                    </div>
                    <div>
                      <Label htmlFor="majority">Mayoría Requerida (%)</Label>
                      <Input id="majority" type="number" defaultValue="51" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="voting-time">Tiempo Límite de Votación (minutos)</Label>
                    <Input id="voting-time" type="number" defaultValue="30" />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Actualizar Configuración</Button>
                </CardContent>
              </Card>

              <Card className="border-orange-100">
                <CardHeader>
                  <CardTitle className="text-gray-800">Configuración General</CardTitle>
                  <CardDescription>Configuraciones específicas de esta asamblea</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="max-participants">Máximo de Participantes</Label>
                      <Input id="max-participants" type="number" defaultValue="100" />
                    </div>
                    <div>
                      <Label htmlFor="registration-deadline">Fecha Límite de Registro</Label>
                      <Input id="registration-deadline" type="date" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="assembly-notes">Notas Adicionales</Label>
                    <Textarea id="assembly-notes" placeholder="Notas o instrucciones especiales para esta asamblea" />
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">Guardar Configuración</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
