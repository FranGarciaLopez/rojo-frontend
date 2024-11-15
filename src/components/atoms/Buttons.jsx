import React from "react";

const Buttons = ({ type, placeholder, value, className, ...others }) => {
          return (
                    <button
                              type={type}
                              {...others}
                              className={`input input-border w-full 
                                        transition duration-200 ease-in-out ${className}`}
                    >
                              {value}
                    </button>
          );        
}

export default Buttons;