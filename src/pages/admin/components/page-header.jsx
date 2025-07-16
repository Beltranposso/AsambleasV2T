

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"



export function PageHeader({ title, description, action }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      {action && (
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2" onClick={action.onClick}>
          <Plus className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      )}
    </header>
  )
}
