"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { PowerTable } from "../Components/power-table"
import { Search, Plus } from "lucide-react"

export function PoderesView({ poderes, getAsambleaName }) {
  return (
   <Card className="bg-white border border-gray-200 rounded-xl shadow-sm w-[1520px]  mt-6 mr-6 ml-45">

      <CardHeader className="border-b border-gray-100 pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">Gestión de Poderes</CardTitle>
        <CardDescription className="text-gray-600">
          Administra y asigna poderes de representación entre usuarios
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar poderes..."
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Poder
          </Button>
        </div>

        <PowerTable poderes={poderes} getAsambleaName={getAsambleaName} />
      </CardContent>
    </Card>
  )
}
