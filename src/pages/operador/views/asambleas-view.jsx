"use client"

import PageHeader from "../Components/page-header"
import { AsambleaCard } from "../Components/asamblea-card"
import { Calendar } from "lucide-react"


export default function AsambleasView({ asambleas, onSelectAsamblea }) {
  return (
    <>
      <PageHeader
        title="Operador de Registro"
        subtitle="Selecciona una asamblea para gestionar usuarios y asistencia"
        badges={[
          {
            icon: <Calendar className="h-4 w-4 mr-1.5" />,
            text: `${asambleas.length} asambleas`,
            variant: "blue",
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {asambleas.map((asamblea) => (
          <AsambleaCard key={asamblea.id} asamblea={asamblea} onClick={onSelectAsamblea} />
        ))}
      </div>
    </>
  )
}
