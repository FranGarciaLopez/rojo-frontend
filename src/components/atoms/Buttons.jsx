import React from "react";

const Buttons = ({ type, placeholder, value, className, ...others }) => {
          return (
                    <button
                              type={type}
                              placeholder={placeholder}
                              {...others}
                              className={`input input-border w-full ${className}`}
                    >
                              {value}
                    </button>
          );        
}

export default Buttons;