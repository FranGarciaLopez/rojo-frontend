import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Subscribe} from "../organisms/Subscribe";

const NavBar = () => {
          const { authToken, logout } = useContext(AuthContext);
          const [isMenuOpen, setIsMenuOpen] = useState(false);
          const [isScrolled, setIsScrolled] = useState(false);
          const [showSubscribe, setShowSubscribe] = useState(false);
          const handleSubscribeClick = () => {
         
            setShowSubscribe((prev) => !prev);
          };

          // Handle scroll to apply enhanceHeader animation
          useEffect(() => {
                    const handleScroll = () => {
                              setIsScrolled(window.scrollY > 50); // trigger when scrolling past 50px
                    };
                    window.addEventListener("scroll", handleScroll);

                    return () => window.removeEventListener("scroll", handleScroll);
          }, []);

          return (
                    <>
                              {/* Navbar */}
                              <nav
                                        className={`bg-white border-gray-200 fixed top-0 left-0 w-full z-50 p-2 transition-all ease-in-out duration-300 ${isScrolled ? "bg-opacity-80 shadow-md backdrop-blur-md" : ""
                                                  }`}
                              >
                                        <div className="max-w-7xl flex justify-end items-center mx-auto p-4">
                                                  {/* Burger Button (Mobile) */}
                                                  <button
                                                            type="button"
                                                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                                                            aria-expanded={isMenuOpen}
                                                  >
                                                            <span className="sr-only">Open main menu</span>
                                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                                                      <path
                                                                                stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="M1 1h15M1 7h15M1 13h15"
                                                                      />
                                                            </svg>
                                                  </button>

                                                  {/* Full-Height Mobile Menu */}
                                                  <div
                                                            className={`fixed inset-0 z-50 bg-white transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}
                                                  >
                                                            <div className="flex flex-col items-center justify-center h-full gap-5 relative">
                                                                      {/* Close Button */}
                                                                      <button
                                                                                type="button"
                                                                                className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                      >
                                                                                <svg
                                                                                          className="w-6 h-6"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          fill="none"
                                                                                          viewBox="0 0 24 24"
                                                                                          stroke="currentColor"
                                                                                          strokeWidth="2"
                                                                                >
                                                                                          <path
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                                    d="M6 18L18 6M6 6l12 12"
                                                                                          />
                                                                                </svg>
                                                                      </button>

                                                                      {authToken ? (
                                                                                <>

                                                                                          <div className="flex items-center -mx-2">
                                                                                                    <Link to="/" className="mx-2 text-gray-900 text-sm font-medium">
                                                                                                              Dashboard</Link>
                                                                                          </div>
                                                                                          <div className="flex items-center -mx-2">
                                                                                                    <Link to="/Blog" className="mx-2 text-gray-900 text-sm font-medium">
                                                                                                              Blog</Link>
                                                                                          </div>
                                                                                          <div className="flex items-center">
                                                                                                    <Link to="/usersettings" className="text-sm text-gray-900 font-medium">
                                                                                                              <i className="fas fa-cog"></i> User Settings
                                                                                                    </Link>
                                                                                          </div>

                                                                                          <div className="flex items-center">

                                                                                                    <button 
                                                                                                      onClick={handleSubscribeClick}
                                                                                                            className="flex items-center justify-center gap-5 bg-green-400 text-sm font-medium hover:bg-green-500 text-white px-4 py-2 rounded-lg"
                                                                                                    > 

                                                                                                              <i className="fas fa-handshake color-black"></i>
                                                                                                          
                                                                                                              <span  className="mr-2">Subscribe</span>
                                                                                                              {showSubscribe && <Subscribe />}  
                                                                                                            

                                                                                                    </button>

                                                                                                    <button
                                                                                                              onClick={logout}
                                                                                                              className="text-lg text-gray-900 font-medium bg-gray-200 px-4 py-2 rounded-lg"
                                                                                                    >
                                                                                                              Logout
                                                                                                    </button>
                                                                                          </div>
                                                                                </>
                                                                      ) : (
                                                                                <>
                                                                                          <Link to="/" className="text-2xl font-semibold text-gray-900">
                                                                                                    Home
                                                                                          </Link>

                                                                                          <div className="flex items-center">
                                                                                                    <Link to="/login" className="text-lg text-gray-900 font-medium">
                                                                                                              Login
                                                                                                    </Link>
                                                                                          </div>
                                                                                </>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* Desktop Menu (for larger screens) */}
                                                  <div className="hidden md:flex w-full justify-between items-center gap-5">
                                                            {authToken ? (
                                                                      <>
                                                                                <div
                                                                                          className={`flex items-start gap-5 flex-grow`}
                                                                                >
                                                                                          <Link to="/" className="text-lg font-semibold text-gray-900">
                                                                                                    Dashboard
                                                                                          </Link>
                                                                                          <div className="flex items-center">
                                                                                                    <Link to="/Blog" className="mx-2 text-lg font-small">
                                                                                                              Blog</Link>
                                                                                          </div>
                                                                                          <div className="flex items-center">
                                                                                                    <Link to="/usersettings" className="mx-2 text-lg font-small"> <i className="fas fa-cog"></i> User Settings</Link>
                                                                                          </div>

                                                                                </div>

                                                                                <div className="flex items-center">
                                                                                          <button  onClick={handleSubscribeClick}
                                                                                                    className="flex items-center justify-center gap-5 bg-green-400 text-sm font-medium hover:bg-green-500 text-white px-4 py-2 rounded-lg"
                                                                                          >
                                                                                              {showSubscribe && <Subscribe />}  

                                                                                                    <i className="fas fa-handshake color-black"></i>
                                                                                                    <span className="mr-2">Subscribe</span>

                                                                                          </button>
                                                                                          <button onClick={logout} className="mx-2 text-gray-900 text-sm font-medium">
                                                                                                    Logout
                                                                                          </button>
                                                                                </div>

                                                                      </>
                                                            ) : (
                                                                      <>
                                                                                <Link to="/" className="text-lg font-semibold text-gray-900">
                                                                                          Home
                                                                                </Link>

                                                                                <Link to="/login" className="text-sm text-gray-900 font-medium">
                                                                                          Login
                                                                                </Link>
                                                                      </>
                                                            )}
                                                  </div>
                                        </div>
                              </nav>

                              {/* Main content below navbar */}
                              <div className="mt-16">
                              </div>
                    </>
          );
};

export default NavBar;
