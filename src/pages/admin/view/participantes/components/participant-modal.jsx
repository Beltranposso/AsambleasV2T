"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../../../components/ui/dialog"
import { Badge } from "../../../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Label } from "../../../../../components/ui/label"
import { Progress } from "../../../../../components/ui/progress"
import { User, Mail, Phone, Building, Calendar, Vote, BarChart3 } from "lucide-react"





export function ParticipantModal({ open, onOpenChange, participant }) {
  if (!participant) return null

  const totalAssemblies = participant.assemblies.length
  const attendedAssemblies = participant.assemblies.filter((a) => a.status === "Asistió").length
  const attendanceRate = totalAssemblies > 0 ? Math.round((attendedAssemblies / totalAssemblies) * 100) : 0

  const totalVotes = participant.assemblies.reduce((sum, a) => sum + a.totalVotes, 0)
  const totalParticipation = participant.assemblies.reduce((sum, a) => sum + a.votingParticipation, 0)
  const avgParticipation = totalAssemblies > 0 ? Math.round(totalParticipation / totalAssemblies) : 0

  const getStatusColor = (status) => {
    switch (status) {
      case "Asistió":
        return "bg-green-50 text-green-700 border-green-200"
      case "No asistió":
        return "bg-red-50 text-red-700 border-red-200"
      case "Programada":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Participante":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Observador":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Invitado":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center">
            <User className="h-6 w-6 mr-2 text-blue-600" />
            Perfil de {participant.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Información detallada y historial de participación
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col">
          <TabsList className="grid w-fit grid-cols-3 flex-shrink-0">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="assemblies">Asambleas</TabsTrigger>
            <TabsTrigger value="voting">Votaciones</TabsTrigger>
          </TabsList>

          {/* Vista de Resumen */}
          <TabsContent value="overview" className="flex-1 overflow-auto space-y-6">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-medium">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{participant.name}</h3>
                      {participant.position && <p className="text-gray-600">{participant.position}</p>}
                      {participant.department && <p className="text-sm text-gray-500">{participant.department}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {participant.email}
                      </div>
                      {participant.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {participant.phone}
                        </div>
                      )}
                      {participant.department && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Building className="h-4 w-4 mr-2" />
                          {participant.department}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalAssemblies}</div>
                  <div className="text-sm text-gray-500">Asambleas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{attendanceRate}%</div>
                  <div className="text-sm text-gray-500">Asistencia</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{totalVotes}</div>
                  <div className="text-sm text-gray-500">Total Votos</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{avgParticipation}%</div>
                  <div className="text-sm text-gray-500">Participación</div>
                </CardContent>
              </Card>
            </div>

            {/* Últimas Asambleas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Últimas Asambleas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {participant.assemblies.slice(0, 3).map((assembly) => (
                    <div
                      key={assembly.assemblyId}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{assembly.assemblyName}</p>
                          <p className="text-sm text-gray-500">{assembly.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getRoleColor(assembly.role)}>
                          {assembly.role}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(assembly.status)}>
                          {assembly.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vista de Asambleas */}
          <TabsContent value="assemblies" className="flex-1 overflow-auto">
            <div className="space-y-4">
              {participant.assemblies.map((assembly) => (
                <Card key={assembly.assemblyId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{assembly.assemblyName}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getRoleColor(assembly.role)}>
                          {assembly.role}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(assembly.status)}>
                          {assembly.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {assembly.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Vote className="h-4 w-4 mr-2" />
                        {assembly.totalVotes} votaciones
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        {assembly.votingParticipation}% participación
                      </div>
                    </div>

                    {assembly.status === "Asistió" && assembly.totalVotes > 0 && (
                      <div className="mt-4 space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Participación en Votaciones</Label>
                        <Progress value={assembly.votingParticipation} className="h-2" />
                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                          <div>
                            <div className="font-medium text-green-600">{assembly.votesInFavor}</div>
                            <div className="text-gray-500">A favor</div>
                          </div>
                          <div>
                            <div className="font-medium text-red-600">{assembly.votesAgainst}</div>
                            <div className="text-gray-500">En contra</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-600">{assembly.abstentions}</div>
                            <div className="text-gray-500">Abstenciones</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vista de Votaciones */}
          <TabsContent value="voting" className="flex-1 overflow-auto">
            <div className="space-y-6">
              {/* Resumen de Votaciones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {participant.assemblies.reduce((sum, a) => sum + a.votesInFavor, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Votos a Favor</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {participant.assemblies.reduce((sum, a) => sum + a.votesAgainst, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Votos en Contra</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {participant.assemblies.reduce((sum, a) => sum + a.abstentions, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Abstenciones</div>
                  </CardContent>
                </Card>
              </div>

              {/* Historial por Asamblea */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Historial de Votaciones por Asamblea</h3>
                {participant.assemblies
                  .filter((a) => a.status === "Asistió" && a.totalVotes > 0)
                  .map((assembly) => {
                    const totalVoted = assembly.votesInFavor + assembly.votesAgainst + assembly.abstentions
                    return (
                      <Card key={assembly.assemblyId}>
                        <CardHeader>
                          <CardTitle className="text-base">{assembly.assemblyName}</CardTitle>
                          <div className="text-sm text-gray-500">{assembly.date}</div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Participación en votaciones</span>
                              <span className="font-medium">{assembly.votingParticipation}%</span>
                            </div>
                            <Progress value={assembly.votingParticipation} className="h-2" />

                            <div className="grid grid-cols-4 gap-4 text-center">
                              <div>
                                <div className="text-lg font-bold text-blue-600">{assembly.totalVotes}</div>
                                <div className="text-xs text-gray-500">Total</div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-green-600">{assembly.votesInFavor}</div>
                                <div className="text-xs text-gray-500">A favor</div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-red-600">{assembly.votesAgainst}</div>
                                <div className="text-xs text-gray-500">Contra</div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-gray-600">{assembly.abstentions}</div>
                                <div className="text-xs text-gray-500">Abstenc.</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
