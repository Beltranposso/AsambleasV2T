"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Users, Vote, Play, Square, Calendar, Clock, BarChart3, History, Settings } from "lucide-react"

export default function ProjectionView({ assembly, onBack }) {
  const [activeTab, setActiveTab] = useState("quorum")
  const [activeVoting, setActiveVoting] = useState(null)
  const [customVotingOptions, setCustomVotingOptions] = useState(["Opción 1", "Opción 2"])
  const [votingType, setVotingType] = useState("standard")

  // Mock data para votaciones pasadas
  const pastVotings = [
    {
      id: 1,
      title: "Aprobación del presupuesto 2024",
      status: "finalizada",
      votes: { favor: 18, contra: 7, abstencion: 3 },
      total: 28,
      resultado: "Aprobada",
      fecha: "2024-01-15 10:30",
    },
    {
      id: 2,
      title: "Modificación de estatutos",
      status: "finalizada",
      votes: { favor: 15, contra: 10, abstencion: 3 },
      total: 28,
      resultado: "Aprobada",
      fecha: "2024-01-15 11:15",
    },
    {
      id: 3,
      title: "Elección de nueva junta directiva",
      status: "finalizada",
      votes: { "María González": 12, "Carlos Rodríguez": 10, "Ana Martínez": 4, "Voto en Blanco": 2 },
      total: 28,
      resultado: "María González electa",
      fecha: "2024-01-15 12:00",
      type: "custom",
    },
  ]

  const startVoting = (votingData) => {
    setActiveVoting(votingData)
    console.log("Iniciando votación:", votingData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Gestión
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Proyección - {assembly.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {assembly.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {assembly.time}
                  </span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">PROYECCIÓN ACTIVA</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Vista de Proyección</p>
              <p className="text-xs text-gray-600">Pantalla para mostrar al público</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-indigo-100 rounded-lg p-1">
            <TabsTrigger
              value="quorum"
              className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
            >
              <Users className="h-4 w-4 mr-2" />
              Quórum
            </TabsTrigger>
            <TabsTrigger
              value="create-voting"
              className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              <Vote className="h-4 w-4 mr-2" />
              Crear Votación
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Resultados
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <History className="h-4 w-4 mr-2" />
              Historial
            </TabsTrigger>
          </TabsList>

          {/* Quorum Tab */}
          <TabsContent value="quorum" className="space-y-6">
            <div className="flex justify-center">
              <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100 w-full max-w-4xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-5xl font-bold text-indigo-800 flex items-center justify-center">
                    <Users className="h-16 w-16 mr-6" />
                    Estado del Quórum
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-12">
                  <div className="text-center">
                    <div className="text-9xl font-bold text-indigo-900 mb-6">
                      {Math.round((assembly.participants / 50) * 100)}%
                    </div>
                    <p className="text-3xl text-indigo-700">Participación Actual</p>
                  </div>

                  <div className="space-y-6">
                    <Progress value={(assembly.participants / 50) * 100} className="h-12" />
                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div className="p-6 bg-white rounded-xl shadow-lg">
                        <div className="text-5xl font-bold text-indigo-900">{assembly.participants}</div>
                        <div className="text-xl text-indigo-700 mt-2">Presentes</div>
                      </div>
                      <div className="p-6 bg-white rounded-xl shadow-lg">
                        <div className="text-5xl font-bold text-indigo-900">25</div>
                        <div className="text-xl text-indigo-700 mt-2">Requerido (50%)</div>
                      </div>
                      <div className="p-6 bg-white rounded-xl shadow-lg">
                        <div className="text-5xl font-bold text-indigo-900">50</div>
                        <div className="text-xl text-indigo-700 mt-2">Total Registrados</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge
                      className={
                        assembly.participants >= 25
                          ? "bg-green-100 text-green-800 border-green-200 text-3xl px-8 py-4"
                          : "bg-red-100 text-red-800 border-red-200 text-3xl px-8 py-4"
                      }
                    >
                      {assembly.participants >= 25 ? "✓ Quórum Alcanzado" : "✗ Sin Quórum"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Create Voting Tab */}
          <TabsContent value="create-voting" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Formulario de creación */}
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-800 flex items-center">
                    <Vote className="h-6 w-6 mr-3" />
                    Crear Nueva Votación
                  </CardTitle>
                  <CardDescription className="text-lg text-purple-700">
                    Configure y lance una votación en tiempo real
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="voting-title" className="text-lg">
                      Título de la Votación
                    </Label>
                    <Input id="voting-title" placeholder="Ej: Aprobación del punto 1" className="text-lg p-4" />
                  </div>
                  <div>
                    <Label htmlFor="voting-description" className="text-lg">
                      Descripción
                    </Label>
                    <Textarea
                      id="voting-description"
                      placeholder="Descripción detallada de la votación"
                      className="text-lg p-4"
                    />
                  </div>

                  <div>
                    <Label className="text-lg">Tipo de Votación</Label>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <Card
                        className={`cursor-pointer border-2 ${votingType === "standard" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                        onClick={() => setVotingType("standard")}
                      >
                        <CardContent className="p-4 text-center">
                          <Vote className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h3 className="font-medium text-lg">Votación Estándar</h3>
                          <p className="text-sm text-gray-600">A favor / En contra / Abstención</p>
                        </CardContent>
                      </Card>
                      <Card
                        className={`cursor-pointer border-2 ${votingType === "custom" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
                        onClick={() => setVotingType("custom")}
                      >
                        <CardContent className="p-4 text-center">
                          <Settings className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <h3 className="font-medium text-lg">Votación Personalizada</h3>
                          <p className="text-sm text-gray-600">Opciones múltiples personalizadas</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {votingType === "custom" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-lg">Opciones de Votación</Label>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setCustomVotingOptions([...customVotingOptions, `Opción ${customVotingOptions.length + 1}`])
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
                              className="text-lg p-3"
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
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="voting-duration" className="text-lg">
                        Duración (minutos)
                      </Label>
                      <Input id="voting-duration" type="number" defaultValue="30" className="text-lg p-3" />
                    </div>
                    <div>
                      <Label htmlFor="voting-quorum" className="text-lg">
                        Quórum requerido (%)
                      </Label>
                      <Input id="voting-quorum" type="number" defaultValue="50" className="text-lg p-3" />
                    </div>
                  </div>

                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-4"
                    disabled={assembly.participants < 25}
                    onClick={() =>
                      startVoting({
                        id: Date.now(),
                        title: "Nueva Votación",
                        type: votingType,
                        options: votingType === "custom" ? customVotingOptions : ["A favor", "En contra", "Abstención"],
                        status: "activa",
                        votes:
                          votingType === "custom"
                            ? customVotingOptions.reduce((acc, option) => ({ ...acc, [option]: 0 }), {})
                            : { favor: 0, contra: 0, abstencion: 0 },
                        total: 0,
                      })
                    }
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Iniciar Votación
                  </Button>
                  {assembly.participants < 25 && (
                    <p className="text-center text-red-600">Se requiere quórum para iniciar votaciones</p>
                  )}
                </CardContent>
              </Card>

              {/* Vista previa del quórum */}
              <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-indigo-800 flex items-center">
                    <Users className="h-6 w-6 mr-3" />
                    Estado Actual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-indigo-900 mb-4">
                      {Math.round((assembly.participants / 50) * 100)}%
                    </div>
                    <p className="text-xl text-indigo-700">Participación</p>
                  </div>

                  <Progress value={(assembly.participants / 50) * 100} className="h-6" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-indigo-900">{assembly.participants}</div>
                      <div className="text-indigo-700">Presentes</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-indigo-900">25</div>
                      <div className="text-indigo-700">Requerido</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge
                      className={
                        assembly.participants >= 25
                          ? "bg-green-100 text-green-800 border-green-200 text-xl px-6 py-3"
                          : "bg-red-100 text-red-800 border-red-200 text-xl px-6 py-3"
                      }
                    >
                      {assembly.participants >= 25 ? "✓ Quórum OK" : "✗ Sin Quórum"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {activeVoting ? (
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100">
                <CardHeader className="text-center">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-4xl font-bold text-emerald-800">Votación en Curso</CardTitle>
                    <Badge className="bg-green-100 text-green-800 animate-pulse text-xl px-4 py-2">ACTIVA</Badge>
                  </div>
                  <CardDescription className="text-2xl text-emerald-700 mt-4">{activeVoting.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Gráfica */}
                    <div className="flex justify-center">
                      <div className="relative w-80 h-80">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="transparent"
                            stroke="#10b981"
                            strokeWidth="30"
                            strokeDasharray={`${(15 / 20) * 219.8} 219.8`}
                            strokeDashoffset="0"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="transparent"
                            stroke="#ef4444"
                            strokeWidth="30"
                            strokeDasharray={`${(3 / 20) * 219.8} 219.8`}
                            strokeDashoffset={`-${(15 / 20) * 219.8}`}
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="transparent"
                            stroke="#f59e0b"
                            strokeWidth="30"
                            strokeDasharray={`${(2 / 20) * 219.8} 219.8`}
                            strokeDashoffset={`-${((15 + 3) / 20) * 219.8}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">20</div>
                            <div className="text-lg text-gray-600">Total</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resultados */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full mr-4"></div>
                            <span className="text-2xl font-medium">A Favor</span>
                          </div>
                          <span className="text-3xl font-bold text-green-700">15 (75%)</span>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-500 rounded-full mr-4"></div>
                            <span className="text-2xl font-medium">En Contra</span>
                          </div>
                          <span className="text-3xl font-bold text-red-700">3 (15%)</span>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full mr-4"></div>
                            <span className="text-2xl font-medium">Abstención</span>
                          </div>
                          <span className="text-3xl font-bold text-yellow-700">2 (10%)</span>
                        </div>
                      </div>

                      <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                        <div className="text-2xl text-gray-600 mb-2">Participación</div>
                        <div className="text-4xl font-bold text-emerald-700">20/50 (40%)</div>
                      </div>

                      <div className="flex justify-center space-x-4">
                        <Button size="lg" variant="destructive" className="text-lg px-8 py-4">
                          <Square className="h-5 w-5 mr-2" />
                          Finalizar Votación
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-16">
                <Vote className="h-24 w-24 mx-auto text-gray-400 mb-6" />
                <h3 className="text-3xl font-bold text-gray-600 mb-4">No hay votación activa</h3>
                <p className="text-xl text-gray-500 mb-8">Cree una nueva votación para ver los resultados aquí</p>
                <Button
                  onClick={() => setActiveTab("create-voting")}
                  className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4"
                >
                  <Vote className="h-5 w-5 mr-2" />
                  Crear Votación
                </Button>
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Historial de Votaciones</h2>
              <p className="text-xl text-gray-600">Todas las votaciones realizadas en esta asamblea</p>
            </div>

            <div className="grid gap-6">
              {pastVotings.map((voting) => (
                <Card key={voting.id} className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl text-blue-900">{voting.title}</CardTitle>
                        <CardDescription className="text-lg text-blue-700 mt-2">
                          Finalizada el {voting.fecha}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-gray-100 text-gray-800 text-lg px-4 py-2 mb-2">
                          {voting.status.toUpperCase()}
                        </Badge>
                        <div className="text-lg font-bold text-blue-800">{voting.resultado}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {voting.type === "custom" ? (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(voting.votes).map(([option, count]) => (
                          <div key={option} className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-700">{count}</div>
                            <div className="text-sm text-blue-600">{option}</div>
                            <div className="text-xs text-gray-500">{((count / voting.total) * 100).toFixed(1)}%</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-700">{voting.votes.favor}</div>
                          <div className="text-sm text-green-600">A Favor</div>
                          <div className="text-xs text-gray-500">
                            {((voting.votes.favor / voting.total) * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-700">{voting.votes.contra}</div>
                          <div className="text-sm text-red-600">En Contra</div>
                          <div className="text-xs text-gray-500">
                            {((voting.votes.contra / voting.total) * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-700">{voting.votes.abstencion}</div>
                          <div className="text-sm text-yellow-600">Abstención</div>
                          <div className="text-xs text-gray-500">
                            {((voting.votes.abstencion / voting.total) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-4 text-center">
                      <span className="text-lg text-gray-600">
                        Total de participantes: <span className="font-bold">{voting.total}</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
