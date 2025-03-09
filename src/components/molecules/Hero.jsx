import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeaturesSection from "../molecules/FeaturesSection";

const Hero = () => {
  return (
    <section className="relative w-full flex-1 flex items-center justify-center"
      {...props}
    >
      <Card className="container mx-auto text-center max-w-7xl">
        <CardContent>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Join Today to connect with the{" "}
            <span className="text-blue-600">
              world
            </span>
          </h1>

          <p className="text-lg md:text-xl mt-4 max-w-7xl mx-auto">
            Experience the best in social networking with cutting-edge features
            and a global community at your fingertips.
          </p>

          <FeaturesSection />

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                Get Started
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
                </svg>
              </Button>
            </Link>

            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Hero;
