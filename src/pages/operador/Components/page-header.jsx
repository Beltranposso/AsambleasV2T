"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"



export  function PageHeader({ title, subtitle, showBackButton, onBack, badges }) {

  const getBadgeClasses = (variant = "blue") => {
    const variants = {

      blue: "bg-blue-50 text-blue-700 border-blue-200",
      green: "bg-green-50 text-green-700 border-green-200",
      gray: "bg-gray-50 text-gray-700 border-gray-200",
    }
    return variants[variant] || variants.blue
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="outline"
              onClick={onBack}
              className="bg-white border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Asambleas
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{"Operador de Registro"}</h1>
            <p className="text-gray-600">{"Selecciona una asamblea para gestionar usuarios y asistencia"}</p>
          </div>
        </div>
        {badges && badges.length > 0 && (
          <div className="flex items-center gap-3">
            {badges.map((badge, index) => (
              <Badge key={index} className={`px-3 py-1.5 ${getBadgeClasses(badge.variant)}`}>
                {badge.icon}
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
