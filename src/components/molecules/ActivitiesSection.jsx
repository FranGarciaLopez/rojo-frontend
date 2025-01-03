import React from "react";
import GridSection from "../atoms/GridSection";
import ActivitiesCard from "../molecules/ActivitiesCard";
import Buttons from "../atoms/Buttons";

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
                                        <ActivitiesCard
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
                                        <Buttons
                                                  onClick={showMoreItems}
                                                  value="Show More"
                                                  className="bg-blue-600 hover:bg-blue-700"
                                        />
                              </div>
                    )}
          </div>
);

export default ActivitiesSection;
