import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Subscribe } from "../organisms/Subscribe";

const NavBar = () => {
  const { authToken, logout, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const isAdmin = user?.isAdministrator;

  const handleSubscribeClick = () => setShowSubscribe((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        data-testid="navbar"
        className={`bg-background border-border fixed top-0 left-0 w-full z-50 p-2 transition-all ease-in-out duration-300 
          ${isScrolled ? "bg-opacity-80 shadow-md backdrop-blur-md" : ""}`}
      >
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          {/* Left Section - Home */}
          <div>
            <Link
              to="/"
              className="text-lg font-medium text-primary-foreground whitespace-nowrap"
              data-testid="home-link"
            >
              Home
            </Link>
          </div>

          {/* Right Section - Desktop Links */}
          <div className="hidden md:flex items-center gap-5">
            {!isAdmin && (
              <Link
                to="/blog"
                className="text-lg font-medium text-primary-foreground whitespace-nowrap"
                data-testid="blog-link"
              >
                Blog
              </Link>
            )}
            {authToken ? (
              <>
                <Link
                  to="/usersettings"
                  className="text-lg font-medium text-primary-foreground flex items-center gap-2"
                  data-testid="user-settings-link"
                >
                  <i className="fas fa-cog"></i>
                  User Settings
                </Link>
                {!isAdmin && (
                  <button
                    onClick={handleSubscribeClick}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-lg whitespace-nowrap
                      transition-colors duration-300
                    "
                  >
                    Subscribe
                  </button>
                )}
                {showSubscribe && <Subscribe />}
                <button
                  data-testid="logout-button"
                  onClick={logout}
                  className="bg-muted text-primary-foreground px-4 py-2 rounded-lg text-lg whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-lg font-medium text-primary-foreground whitespace-nowrap"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-lg font-medium text-primary-foreground whitespace-nowrap"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-muted-foreground rounded-lg 
              hover:bg-accent transition-colors duration-300 focus:outline-none"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-background p-6 transition-transform duration-300"
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-4">
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-accent focus:outline-none hover:text-accent transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="w-6 h-6 text-muted-foreground"
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

              {!isAdmin && (
                <Link
                  to="/blog"
                  className="text-lg font-medium text-primary-foreground w-full text-center py-2
                    hover:bg-accent hover:rounded-lg transition-colors duration-300
                  "
                >
                  Blog
                </Link>
              )}
              {authToken ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-lg font-medium text-primary-foreground w-full text-center py-2
                    hover:bg-accent hover:rounded-lg transition-colors duration-300
                  "
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/usersettings"
                    className="text-lg font-medium text-primary-foreground w-full text-center py-2
                      hover:bg-accent hover:rounded-lg transition-colors duration-300
                    "
                  >
                    <i className="fas fa-cog"></i>
                    User Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-primary text-primary-foreground w-full py-2 rounded-lg text-lg hover:bg-muted transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-lg font-medium text-primary-foreground w-full text-center py-2"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="text-lg font-medium text-primary-foreground w-full text-center py-2"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Placeholder for main content */}
      <div className="mt-16"></div>
    </>
  );
};

export default NavBar;
