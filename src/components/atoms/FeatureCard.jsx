import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const FeatureCard = ({ title, description, svgIcon }) => {
  return (
    <Card className="hover:shadow-xl hover:bg-secondary transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 text-primary text-4xl">
          {svgIcon}
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
