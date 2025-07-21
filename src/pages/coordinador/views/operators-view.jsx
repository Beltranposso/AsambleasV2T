"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CreateOperatorDialog from "../Components/create-operator-dialog"
import OperatorsTable from "../Components/operators-table"

export default function OperatorsView({ operators, assemblies }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Operadores de Registro</h2>
        <CreateOperatorDialog />
      </div>

      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-gray-800">Lista de Operadores</CardTitle>
          <CardDescription>Todos los operadores de registro del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <OperatorsTable operators={operators} assemblies={assemblies} />
        </CardContent>
      </Card>
    </div>
  )
}
