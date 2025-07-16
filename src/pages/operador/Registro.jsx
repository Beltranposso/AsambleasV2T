"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { PageHeader } from "@/components/layout/page-header"
import { AsambleasView } from "@/views/asambleas-view"
import { UsuariosView } from "@/views/usuarios-view"
import { PoderesView } from "@/views/poderes-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Shield, CheckCircle } from "lucide-react"

export default function RegistroOperador() {
  const [currentView, setCurrentView] = useState("asambleas")
  const [selectedAsambleaId, setSelectedAsambleaId] = useState(null)

  // Datos de ejemplo
  const asambleas = [
    {
      id: "1",
      nombre: "Asamblea General Ordinaria 2024",
      fecha: "2024-03-15",
      hora: "10:00",
      lugar: "Auditorio Principal",
      totalUsuarios: 45,
      asistentes: 32,
      estado: "activa",
    },
    {
      id: "2",
      nombre: "Asamblea Extraordinaria Marzo",
      fecha: "2024-03-22",
      hora: "14:00",
      lugar: "Sala de Conferencias",
      totalUsuarios: 28,
      asistentes: 18,
      estado: "programada",
    },
    {
      id: "3",
      nombre: "Asamblea de Socios Fundadores",
      fecha: "2024-04-05",
      hora: "09:00",
      lugar: "Sala Ejecutiva",
      totalUsuarios: 12,
      asistentes: 8,
      estado: "programada",
    },
  ]

  const usuarios = [
    {
      id: "1",
      nombre: "María García",
      email: "maria.garcia@email.com",
      cedula: "12345678",
      telefono: "+34 600 123 456",
      asamblea: "1",
      asistencia: "presente",
      fechaRegistro: "2024-01-15",
      poderes: 2,
    },
    {
      id: "2",
      nombre: "Juan Pérez",
      email: "juan.perez@email.com",
      cedula: "87654321",
      telefono: "+34 600 654 321",
      asamblea: "1",
      asistencia: "ausente",
      fechaRegistro: "2024-01-16",
      poderes: 0,
    },
    {
      id: "3",
      nombre: "Ana Martínez",
      email: "ana.martinez@email.com",
      cedula: "11223344",
      telefono: "+34 600 789 012",
      asamblea: "2",
      asistencia: "pendiente",
      fechaRegistro: "2024-01-17",
      poderes: 1,
    },
    {
      id: "4",
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      cedula: "55667788",
      telefono: "+34 600 111 222",
      asamblea: "1",
      asistencia: "representado",
      fechaRegistro: "2024-01-18",
      poderes: 0,
    },
  ]

  const poderes = [
    {
      id: "1",
      otorgante: "Carlos Rodríguez",
      cedulaOtorgante: "55667788",
      representante: "María García",
      asamblea: "1",
      fechaOtorgamiento: "2024-01-20",
      estado: "activo",
      observaciones: "Poder general para votación",
    },
    {
      id: "2",
      otorgante: "Luis Fernández",
      cedulaOtorgante: "99887766",
      representante: "María García",
      asamblea: "1",
      fechaOtorgamiento: "2024-01-21",
      estado: "activo",
      observaciones: "Poder específico para punto 3 del orden del día",
    },
  ]

  const handleSelectAsamblea = (asambleaId) => {
    setSelectedAsambleaId(asambleaId)
    setCurrentView("usuarios")
  }

  const handleBackToAsambleas = () => {
    setCurrentView("asambleas")
    setSelectedAsambleaId(null)
  }

  const handleToggleAsistencia = (userId, currentAsistencia) => {
    console.log(`Toggling asistencia for user ${userId} from ${currentAsistencia}`)
  }

  const handleManagePowers = (user) => {
    console.log("Managing powers for user:", user)
  }

  const getAsambleaName = (id) => {
    const asamblea = asambleas.find((a) => a.id === id)
    return asamblea ? asamblea.nombre : "Sin asignar"
  }

  const filteredUsuarios = usuarios.filter((usuario) => !selectedAsambleaId || usuario.asamblea === selectedAsambleaId)
  const filteredPoderes = poderes.filter((poder) => !selectedAsambleaId || poder.asamblea === selectedAsambleaId)
  const selectedAsamblea = asambleas.find((a) => a.id === selectedAsambleaId)

  if (currentView === "asambleas") {
    return (
      <MainLayout>
        <AsambleasView asambleas={asambleas} onSelectAsamblea={handleSelectAsamblea} />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <PageHeader
        title={selectedAsamblea?.nombre || "Asamblea"}
        subtitle="Gestión de usuarios y asistencia"
        showBackButton
        onBack={handleBackToAsambleas}
        badges={[
          {
            icon: <Users className="h-4 w-4 mr-1.5" />,
            text: `${filteredUsuarios.length} usuarios`,
            variant: "blue",
          },
          {
            icon: <CheckCircle className="h-4 w-4 mr-1.5" />,
            text: `${filteredUsuarios.filter((u) => u.asistencia === "presente").length} presentes`,
            variant: "green",
          },
        ]}
      />

      <Tabs defaultValue="usuarios" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
          <TabsTrigger
            value="usuarios"
            className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            <Users className="h-4 w-4" />
            Gestión de Usuarios
          </TabsTrigger>
          <TabsTrigger
            value="poderes"
            className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
          >
            <Shield className="h-4 w-4" />
            Gestión de Poderes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios">
          <UsuariosView
            usuarios={filteredUsuarios}
            asambleaName={selectedAsamblea?.nombre || ""}
            onToggleAsistencia={handleToggleAsistencia}
            onManagePowers={handleManagePowers}
          />
        </TabsContent>

        <TabsContent value="poderes">
          <PoderesView poderes={filteredPoderes} getAsambleaName={getAsambleaName} />
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}
