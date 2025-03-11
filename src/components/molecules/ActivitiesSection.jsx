import React from "react"
// Use the refactored GridSection and Button components
import GridSection from "../atoms/GridSection"
import Card from "./Card"
import Buttons from "../atoms/Buttons" // Import Buttons instead of directly from shadcn/ui

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
                                        <Buttons
                                                  type="button"
                                                  size="lg"
                                                  className="w-full"
                                                  onClick={showMoreItems}
                                                  value="Show More"
                                        />
                              </div>
                    )}
          </div>
)

export default ActivitiesSection
