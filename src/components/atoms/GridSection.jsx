import React, { forwardRef } from "react";

const GridSection = ({ children }) => {
          return (
                    <section className="bg-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                              {children}
                    </section>
          )
}

export default GridSection;

