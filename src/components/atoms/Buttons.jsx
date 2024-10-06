import React from "react";

const Buttons = ({ type, placeholder, value, onChange }) => {
          return (
                    <button
                              type={type}
                              placeholder={placeholder}
                              value={value}
                              onChange={onChange}
                    />
          );
}

export default Buttons;