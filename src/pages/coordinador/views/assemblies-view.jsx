  "use client"

import CreateAssemblyDialog from "../Components/create-assembly-dialog"
import AssemblyCard from "../Components/assembly-card"

export default function AssembliesView({ assemblies, operators, onOpenAssembly }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Asambleas</h2>
        <CreateAssemblyDialog />
      </div>

      <div className="grid gap-6">
        {assemblies.map((assembly) => (
          <AssemblyCard key={assembly.id} assembly={assembly} operators={operators} onOpenAssembly={onOpenAssembly} />
        ))}
      </div>
    </div>
  )
}
