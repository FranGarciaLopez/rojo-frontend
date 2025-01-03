import React, { useEffect, useState } from "react";

const Alert = ({ message, type = "info", onClose, duration = 5000 }) => {
          const [isVisible, setIsVisible] = useState(true);

          useEffect(() => {
                    if (duration) {
                              const timer = setTimeout(() => {
                                        setIsVisible(false);
                                        if (onClose) onClose();
                              }, duration);
                              return () => clearTimeout(timer);
                    }
          }, [duration, onClose]);

          if (!isVisible) return null;

          const typeClasses = {
                    success: "bg-green-100 text-green-700 border-green-400",
                    warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
                    error: "bg-red-100 text-red-700 border-red-400",
                    info: "bg-blue-100 text-blue-700 border-blue-400",
          };

          const typeClass = typeClasses[type] || typeClasses.info;

          return (
                    <div
                              className={`flex items-center justify-center p-4 mb-2 border rounded-lg shadow-lg ${typeClass}`}
                              role="alert"
                    >
                              <div className="ml-3 text-sm font-medium">{message}</div>
                              <button
                                        onClick={() => {
                                                  setIsVisible(false);
                                                  if (onClose) onClose();
                                        }}
                                        className="ml-4 bg-transparent text-current hover:text-gray-500"
                              >
                                        ✖
                              </button>
                    </div>
          );
};

export default Alert;
