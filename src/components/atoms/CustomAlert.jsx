import React from "react"
// Import shadcn/ui components (adjust path as needed)
import {
  Alert as ShadcnAlert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert"

const CustomAlert = ({ title, description, actions }) => {
  return (
    <ShadcnAlert variant="destructive" role="alert">
      <div className="flex flex-col gap-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {actions && <div className="mt-4">{actions}</div>}
      </div>
    </ShadcnAlert>
  )
}

export default CustomAlert
