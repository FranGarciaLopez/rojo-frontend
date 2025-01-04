const EventDetails = ({ event }) => {
          return (
                    <div className="bg-white shadow-md rounded-lg p-6 m-5">
                              <h2 className="text-xl font-bold">{event.title || "No Title"}</h2>
                              <p className="text-gray-600">{event.description || "No Description"}</p>
                              <p className="text-gray-600">
                                        Date: {event.dateTime ? new Date(event.dateTime).toLocaleString() : "No Date"}
                              </p>
                              <p className="text-gray-600">
                                        Location: {event.city?.name || "No City"}
                              </p>
                              <p className="text-gray-600">
                                        Category: {event.category?.categoryName || "No Category"}
                              </p>
                              <div className="photos">
                                        {event.photos && event.photos.length > 0 ? (
                                                  event.photos.map((photo, index) => (
                                                            <img
                                                                      key={index}
                                                                      src={photo}
                                                                      alt={`Event Photo ${index + 1}`}
                                                                      className="w-32 h-32 object-cover rounded-md mr-2"
                                                            />
                                                  ))
                                        ) : (
                                                  <p>No Photos Available</p>
                                        )}
                              </div>
                    </div>
          );
};

export default EventDetails;
