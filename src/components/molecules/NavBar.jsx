import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Subscribe } from "../organisms/Subscribe";

const NavBar = () => {
  const { authToken, logout, user } = useContext(AuthContext); // Assume user object is available
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const handleSubscribeClick = () => {
    setShowSubscribe((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = user?.isAdministrator;

  return (
    <>
      {/* Navbar */}
      <nav
        className={`bg-white border-gray-200 fixed top-0 left-0 w-full z-50 p-2 transition-all ease-in-out duration-300 ${isScrolled ? "bg-opacity-80 shadow-md backdrop-blur-md" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Dashboard (Left Column for Desktop) */}
          <div className="hidden md:flex items-center">
            {authToken && (
              <Link
                to="/"
                className="text-lg font-medium text-gray-900 whitespace-nowrap"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Links and Buttons (Right Column for Desktop) */}
          <div className="hidden md:flex justify-center items-center gap-5">
            {authToken ? (
              <>
                {/* Render Blog and Subscribe only if the user is NOT an admin */}
                <Link
                  to="/usersettings"
                  className="text-lg font-medium text-gray-900 whitespace-nowrap"
                >
                  <i className="fas fa-cog"></i> User Settings
                </Link>
                {!isAdmin && (
                  <>
                    <Link
                      to="/Blog"
                      className="text-lg font-medium text-gray-900 whitespace-nowrap"
                    >
                      Blog
                    </Link>
                    <button
                      onClick={handleSubscribeClick}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-lg whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                    {showSubscribe && <Subscribe />}
                  </>
                )}
                <button
                  onClick={logout}
                  className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-lg whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-lg font-medium text-gray-900 whitespace-nowrap"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-lg font-medium text-gray-900 whitespace-nowrap"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden justify-end">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Full-Height Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-white p-4 transition-transform duration-300"
            style={{ height: "100vh", overflowY: "auto" }}
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

              {/* Menu Content */}
              {authToken ? (
                <>
                  <Link to="/" className="text-lg font-medium text-gray-900">
                    Dashboard
                  </Link>
                  {!isAdmin && (
                    <>
                      <Link
                        to="/Blog"
                        className="text-lg font-medium text-gray-900"
                      >
                        Blog
                      </Link>
                      <button
                        onClick={handleSubscribeClick}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-lg"
                      >
                        Subscribe
                      </button>
                      {showSubscribe && <Subscribe />}
                    </>
                  )}
                  <Link
                    to="/usersettings"
                    className="text-lg font-medium text-gray-900"
                  >
                    <i className="fas fa-cog"></i> User Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="text-lg font-medium text-gray-900">
                    Home
                  </Link>
                  <Link
                    to="/register"
                    className="text-lg font-medium text-gray-900"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="text-lg font-medium text-gray-900"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main content below navbar */}
      <div className="mt-16"></div>
    </>
  );
};

export default NavBar;
