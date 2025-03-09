import React from "react";
import GridSection from "../atoms/GridSection";
import Card from "./Card";
import { Button } from "../ui/button";

const ActivitiesSection = ({
          activities,
          visibleItems,
          showMoreItems,
          interestedInAEvent,
          interestedEvents,
          loadingEvent,
}) => (
          <div className="relative">

                    {/* Grid Section */}
                    <GridSection>
                              {activities.slice(0, visibleItems).map((activity) => (
                                        <Card
                                                  key={activity._id}
                                                  activity={activity}
                                                  interestedInAEvent={interestedInAEvent}
                                                  interestedEvents={interestedEvents}
                                                  loadingEvent={loadingEvent}
                                        />
                              ))}
                    </GridSection>

                    {/* Show More Button */}
                    {visibleItems < activities.length && (
                              <div className="flex justify-center mt-4">
                                        <Button type="submit" size="lg" className="w-full"
                                                  onClick={showMoreItems}
                                        >
                                                  Show More
                                        </Button>
                              </div>
                    )}
          </div>
);

export default ActivitiesSection;
