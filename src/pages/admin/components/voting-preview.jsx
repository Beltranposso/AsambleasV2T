"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { CheckCircle, Eye, BarChart3 } from "lucide-react"
import { VotingResultsModal } from "./voting-results-modal"





export function VotingPreview({ votes, assemblyName, maxPreview = 3 }) {
  const [modalOpen, setModalOpen] = useState(false)

  if (votes.length === 0) {
    return (
      <div className="border-t pt-4">
        <Label className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2 block">
          Resultados de Votaciones
        </Label>
        <div className="text-sm text-gray-500 text-center py-4">No hay votaciones registradas</div>
      </div>
    )
  }

  const getApprovalRate = (vote) => Math.round((vote.inFavor / vote.total) * 100)
  const averageApproval = Math.round(
    (votes.reduce((sum, vote) => sum + vote.inFavor, 0) / votes.reduce((sum, vote) => sum + vote.total, 0)) * 100,
  )

  return (
    <>
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-xs text-gray-500 uppercase tracking-wide font-medium">Resultados de Votaciones</Label>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {votes.length} votaciones
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {averageApproval}% aprobación
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          {votes.slice(0, maxPreview).map((vote) => (
            <div key={vote.id} className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
              <div className="flex-1 mr-3">
                <span className="text-gray-700 font-medium line-clamp-1">{vote.topic}</span>
                <div className="flex items-center gap-2 mt-1">
                  {vote.category && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                      {vote.category}
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">{vote.total} participantes</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-green-600 font-medium text-sm">{getApprovalRate(vote)}%</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {vote.inFavor}/{vote.total}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {votes.length > maxPreview && (
            <div className="text-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(true)}
                className="bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver todas las {votes.length} votaciones
              </Button>
            </div>
          )}

          {votes.length <= maxPreview && votes.length > 0 && (
            <div className="text-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(true)}
                className="bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver detalles completos
              </Button>
            </div>
          )}
        </div>
      </div>

      <VotingResultsModal open={modalOpen} onOpenChange={setModalOpen} assemblyName={assemblyName} votes={votes} />
    </>
  )
}
