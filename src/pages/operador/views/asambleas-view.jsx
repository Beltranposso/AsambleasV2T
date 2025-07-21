"use client"

import { PageHeader } from "../Components/page-header"
import { AsambleaCard } from "../Components/asamblea-card"
import { Calendar } from "lucide-react"

export function AsambleasView({ asambleas, onSelectAsamblea }) {
  return (
    <div className="px-45 space-y-6"> {/* AQUÍ */}
      

      <PageHeader title="Asambleas" icon={Calendar} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {asambleas.map((asamblea) => (
          <AsambleaCard key={asamblea.id} asamblea={asamblea} onClick={onSelectAsamblea} />
        ))}
      </div>
    </div>
  )
}
