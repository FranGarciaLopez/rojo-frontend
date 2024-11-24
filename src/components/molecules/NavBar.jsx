import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavBar = () => {
          const { authToken, logout } = useContext(AuthContext);

          return (
                    <nav className="bg-white border-gray-200">
                              <div className="max-w-xl flex flex-wrap items-center justify-around mx-auto p-4">
                                        <button
                                                  data-collapse-toggle="navbar-default"
                                                  type="button"
                                                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                  aria-controls="navbar-default"
                                                  aria-expanded="false"
                                        >
                                                  <span className="sr-only">Open main menu</span>
                                                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                                  </svg>
                                        </button>

                                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                                                  <div className="flex items-center justify-between w-full gap-5 md:w-auto">

                                                            {authToken ? (
                                                                      <>
                                                                       <div className="flex items-center -mx-2">
                                                                                <Link to="/Blog" className="mx-2 text-gray-900 text-sm font-medium"> 
                                                                                Blog</Link>
                                                                                </div>
                                                                                <div className="flex items-center -mx-2">
                                                                                          <Link to="/usersettings" className="mx-2 text-gray-900 text-sm font-medium"> <i className="fas fa-cog"></i> User Settings</Link>
                                                                                </div>

                                                                                <div className="flex items-center -mx-2">
                                                                                          <button onClick={logout} className="mx-2 text-gray-900 text-sm font-medium">
                                                                                                    Logout
                                                                                          </button>
                                                                                </div>
                                                                               
                                                                      </>
                                                            ) : (
                                                                      <>
                                                                                <Link to="/" className="text-lg font-semibold text-gray-900">Rojo</Link>

                                                                                <div className="flex items-center -mx-2">
                                                                                          <Link to="/login" className="mx-2 text-gray-900 text-sm font-medium">Login</Link>
                                                                                </div>
                                                                      </>
                                                            )}

                                                  </div>
                                        </div>
                              </div>
                    </nav>
          );
};

export default NavBar;
