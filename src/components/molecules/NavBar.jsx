import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Subscribe } from "../organisms/Subscribe";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NavBar = () => {
  const { authToken, logout, user } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const isAdmin = user?.isAdministrator;

  const handleSubscribeClick = () => setShowSubscribe((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        data-testid="navbar"
        className={`bg-background border-border fixed top-0 left-0 w-full z-50 p-2 transition-all ease-in-out duration-300 ${isScrolled ? "bg-opacity-80 shadow-md backdrop-blur-md" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left Section - Home */}
          <div className="hidden md:flex items-center">
            <Link
              to="/"
              className="text-lg font-medium text-foreground"
              data-testid="home-link"
            >
              Home
            </Link>
          </div>

          {/* Right Section - Links */}
          <div className="hidden md:flex justify-end items-center gap-5">
            {!isAdmin && (
              <Link
                to="/blog"
                className="text-lg font-medium text-foreground"
                data-testid="blog-link"
              >
                Blog
              </Link>
            )}
            {authToken ? (
              <>
                <Link
                  to="/usersettings"
                  className="text-lg font-medium text-foreground"
                  data-testid="user-settings-link"
                >
                  ⚙️ User Settings
                </Link>
                {!isAdmin && (
                  <Button
                    onClick={handleSubscribeClick}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Subscribe
                  </Button>
                )}
                {showSubscribe && <Subscribe />}
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-foreground"
                  data-testid="logout-button"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-lg font-medium text-foreground"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-lg font-medium text-foreground"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-10 h-10 rounded-full focus:outline-none"
                >
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
                </Button>
              </SheetTrigger>

              {/* Mobile Menu */}
              <SheetContent side="right" className="bg-background">
                <div className="flex flex-col items-center justify-center h-full gap-5">
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="absolute top-4 right-4 w-10 h-10"
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
                    </Button>
                  </SheetClose>

                  {!isAdmin && (
                    <Link
                      to="/blog"
                      className="text-lg font-medium text-foreground"
                    >
                      Blog
                    </Link>
                  )}
                  {authToken ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-lg font-medium text-foreground"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/usersettings"
                        className="text-lg font-medium text-foreground"
                      >
                        ⚙️ User Settings
                      </Link>
                      <Button
                        onClick={logout}
                        variant="outline"
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="text-lg font-medium text-foreground"
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="text-lg font-medium text-foreground"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Placeholder for main content */}
      <div className="mt-16"></div>
    </>
  );
};

export default NavBar;
