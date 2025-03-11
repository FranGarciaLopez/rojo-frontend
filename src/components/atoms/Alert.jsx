import React, { useEffect, useState } from "react"
// Import shadcn/ui Alert components (adjust the path if needed)
import {
          Alert as ShadcnAlert,
          AlertTitle,
          AlertDescription,
} from "@/components/ui/alert"

const Alert = ({ message, type = "info", onClose, duration = 5000 }) => {
          const [isVisible, setIsVisible] = useState(true)

          useEffect(() => {
                    if (duration) {
                              const timer = setTimeout(() => {
                                        setIsVisible(false)
                                        onClose?.()
                              }, duration)
                              return () => clearTimeout(timer)
                    }
          }, [duration, onClose])

          if (!isVisible) return null

          // Map your custom alert types to shadcn/ui "variant"
          // (You can expand this mapping if you have more use-cases)
          const variant = type === "error" ? "destructive" : "default"

          // Optional: different titles by type
          const titleMap = {
                    success: "Success",
                    warning: "Warning",
                    error: "Error",
                    info: "Information",
          }
          const alertTitle = titleMap[type] || "Alert"

          return (
                    <ShadcnAlert variant={variant} role="alert" data-testid="alert">
                              <div className="flex flex-1 flex-col gap-1">
                                        <AlertTitle>{alertTitle}</AlertTitle>
                                        <AlertDescription>{message}</AlertDescription>
                              </div>
                              <button
                                        onClick={() => {
                                                  setIsVisible(false)
                                                  onClose?.()
                                        }}
                                        className="ml-auto text-current hover:opacity-70"
                                        data-testid="close-alert-button"
                              >
                                        ✕
                              </button>
                    </ShadcnAlert>
          )
}

export default Alert
