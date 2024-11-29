import React, { useState } from "react";

const Alert = ({ message, className, ...others }) => {

          const [isVisible, setIsVisible] = useState(true);

          const closeAlert = () => {
                    setIsVisible(false);
          };

          if(!isVisible) return null

          return (
                    /* role from others */
                    <div id="alert-border-2" className={`${className}`} {...others}>
                              <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                              </svg>
                              <div className="ms-3 text-sm font-medium">
                                        {message}
                              </div>
                              <button type="button"
                                        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2
                                        focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center 
                                        h-8 w-8"
                                        onClick={closeAlert}       
                              >
                                        <span className="sr-only">Dismiss</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                  <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                              </button>
                    </div>
          )
};

export default Alert;