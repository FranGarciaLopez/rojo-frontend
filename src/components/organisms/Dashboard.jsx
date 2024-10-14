import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../molecules/NavBar";

export const Dashboard = () => {

          const { user } = React.useContext(AuthContext);
       

          return (
                    <>
                              <NavBar />
                              <div className="p-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
                                        <h1>Dashboard</h1>

                                        {user ? (
                                                  
                                                  <p className="text-lg">Welcome, {user.user.firstname}!</p>
                                        ) : (
                                                  <p className="text-lg">Loading user info...</p>
                                        )}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt="" />
                                                  </div>
                                                  <div>
                                                            <img className="h-auto rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="" />
                                                  </div>
                                        </div>

                              </div>
                    </>
          );
};
