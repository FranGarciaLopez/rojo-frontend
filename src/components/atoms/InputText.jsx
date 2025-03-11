import React, { forwardRef } from "react"
// Import shadcn/ui Input component
import { Input as ShadcnInput } from "@/components/ui/input" // Adjust the path if needed

const InputText = forwardRef(({ className, ...others }, ref) => {
    return (
        <ShadcnInput
            ref={ref}
            {...others}
            className={`w-full ${className || ""}`}
        />
    )
})

InputText.displayName = "InputText"

export default InputText
