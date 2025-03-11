import React from "react"
// Import shadcn/ui Label component
import { Label as ShadcnLabel } from "@/components/ui/label" // Adjust the path if necessary

const Label = ({ children, ...props }) => {
          return <ShadcnLabel {...props}>{children}</ShadcnLabel>
}

export default Label
