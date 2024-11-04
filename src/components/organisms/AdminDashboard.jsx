import React, { useState, useEffect, useContext } from "react";
import NavBar from "../molecules/NavBar";

export const AdminDashboard = () => {

          return (
                    <>
                              <NavBar />

                              <div className="p-10 flex flex-col items-center justify-center max-w-6xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Activities</h1>
                              </div>


                    </>
          );
};
