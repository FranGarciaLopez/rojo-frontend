import React, { forwardRef } from "react";

const InputText = forwardRef(({  className, ...others }, ref) => {
          return (
                    <input
                              className={`input input-border w-full ${className}`}
                              ref={ref}
                              {...others}
                    />
          );
});

export default InputText;
