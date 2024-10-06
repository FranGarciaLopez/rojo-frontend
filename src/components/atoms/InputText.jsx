import React, { forwardRef } from "react";

const InputText = forwardRef(({ type, placeholder, className, ...others }, ref) => {
          return (
                    <input
                              type={type}
                              placeholder={placeholder}
                              className={`input input-border w-full ${className}`}
                              ref={ref}
                              {...others}
                    />
          );
});

export default InputText;
