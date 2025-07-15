"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Progress } from "../../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { CheckCircle, XCircle, MinusCircle, BarChart3, Download, Users, Vote } from "lucide-react"




export function VotingResultsModal({ open, onOpenChange, assemblyName, votes }) {
  const [viewMode, setViewMode] = useState("list")

  const totalVotes = votes.reduce((sum, vote) => sum + vote.total, 0)
  const averageApproval =
    votes.length > 0 ? Math.round((votes.reduce((sum, vote) => sum + vote.inFavor, 0) / totalVotes) * 100) : 0

  const getApprovalRate = (vote) => Math.round((vote.inFavor / vote.total) * 100)

  const getApprovalColor = (rate) => {
    if (rate >= 80) return "text-green-600 bg-green-50 border-green-200"
    if (rate >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const categorizedVotes = votes.reduce(
    (acc, vote) => {
      const category = vote.category || "General"
      if (!acc[category]) acc[category] = []
      acc[category].push(vote)
      return acc
    },
    {},
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center">
            <Vote className="h-6 w-6 mr-2 text-blue-600" />
            Resultados de Votaciones - {assemblyName}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {votes.length} votaciones realizadas • {averageApproval}% de aprobación promedio
          </DialogDescription>
        </DialogHeader>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value )} className="flex-1 flex flex-col">
          <div className="flex items-center justify-between flex-shrink-0 pb-4">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="grid">Tarjetas</TabsTrigger>
              <TabsTrigger value="summary">Resumen</TabsTrigger>
            </TabsList>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </div>

          {/* Vista de Lista */}
          <TabsContent value="list" className="flex-1 overflow-auto">
            <div className="space-y-3">
              {votes.map((vote, index) => {
                const approvalRate = getApprovalRate(vote)
                return (
                  <Card key={vote.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                            {vote.priority && (
                              <Badge variant="outline" className={getPriorityColor(vote.priority)}>
                                {vote.priority}
                              </Badge>
                            )}
                            {vote.category && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {vote.category}
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-medium text-gray-900 mb-2">{vote.topic}</h4>
                        </div>
                        <Badge variant="outline" className={getApprovalColor(approvalRate)}>
                          {approvalRate}% aprobación
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm font-medium text-gray-900">{vote.inFavor}</span>
                          </div>
                          <p className="text-xs text-gray-500">A favor</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-sm font-medium text-gray-900">{vote.against}</span>
                          </div>
                          <p className="text-xs text-gray-500">En contra</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <MinusCircle className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm font-medium text-gray-900">{vote.abstentions}</span>
                          </div>
                          <p className="text-xs text-gray-500">Abstenciones</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="text-sm font-medium text-gray-900">{vote.total}</span>
                          </div>
                          <p className="text-xs text-gray-500">Total</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600">A favor</span>
                          <span className="text-green-600">{Math.round((vote.inFavor / vote.total) * 100)}%</span>
                        </div>
                        <Progress value={(vote.inFavor / vote.total) * 100} className="h-2 bg-gray-100">
                          <div className="h-full bg-green-500 rounded-full transition-all" />
                        </Progress>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Vista de Tarjetas */}
          <TabsContent value="grid" className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {votes.map((vote, index) => {
                const approvalRate = getApprovalRate(vote)
                return (
                  <Card key={vote.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                          {vote.priority && (
                            <Badge variant="outline" className={getPriorityColor(vote.priority)} size="sm">
                              {vote.priority}
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className={getApprovalColor(approvalRate)} size="sm">
                          {approvalRate}%
                        </Badge>
                      </div>
                      <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2">{vote.topic}</CardTitle>
                      {vote.category && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 w-fit">
                          {vote.category}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-600">{vote.inFavor}</div>
                            <div className="text-xs text-gray-500">A favor</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-red-600">{vote.against}</div>
                            <div className="text-xs text-gray-500">Contra</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-600">{vote.abstentions}</div>
                            <div className="text-xs text-gray-500">Abstenc.</div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Progress value={(vote.inFavor / vote.total) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Total: {vote.total}</span>
                            <span>{approvalRate}% aprobación</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Vista de Resumen */}
          <TabsContent value="summary" className="flex-1 overflow-auto">
            <div className="space-y-6">
              {/* Estadísticas Generales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{votes.length}</div>
                    <div className="text-sm text-gray-500">Total Votaciones</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{averageApproval}%</div>
                    <div className="text-sm text-gray-500">Aprobación Promedio</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{Math.round(totalVotes / votes.length)}</div>
                    <div className="text-sm text-gray-500">Participación Promedio</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {votes.filter((v) => getApprovalRate(v) >= 80).length}
                    </div>
                    <div className="text-sm text-gray-500">Alta Aprobación (≥80%)</div>
                  </CardContent>
                </Card>
              </div>

              {/* Votaciones por Categoría */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Votaciones por Categoría
                </h3>

                {Object.entries(categorizedVotes).map(([category, categoryVotes]) => {
                  const categoryApproval = Math.round(
                    (categoryVotes.reduce((sum, vote) => sum + vote.inFavor, 0) /
                      categoryVotes.reduce((sum, vote) => sum + vote.total, 0)) *
                      100,
                  )

                  return (
                    <Card key={category}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{category}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{categoryVotes.length} votaciones</Badge>
                            <Badge variant="outline" className={getApprovalColor(categoryApproval)}>
                              {categoryApproval}% aprobación
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {categoryVotes.map((vote, index) => (
                            <div key={vote.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700 flex-1 truncate">{vote.topic}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{vote.total} votos</span>
                                <Badge variant="outline" className={getApprovalColor(getApprovalRate(vote))} size="sm">
                                  {getApprovalRate(vote)}%
                                </Badge>
                              </div>
                            </div>
                          ))}
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
