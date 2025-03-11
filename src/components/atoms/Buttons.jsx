import React from "react"
// Import shadcn/ui Button component
import { Button as ShadcnButton } from "@/components/ui/button"

const Buttons = ({ type, value, className, ...others }) => {
          return (
                    <ShadcnButton
                              type={type}
                              {...others}
                              className={`transition duration-200 ease-in-out ${className || ""}`}
                    >
                              {value}
                    </ShadcnButton>
          )
}

export default Buttons
