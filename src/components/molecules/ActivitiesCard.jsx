const ActivityCard = ({ activity, interestedInAEvent, interestedEvents, loadingEvent }) => {
          
          const isAlreadyInterested = interestedEvents.includes(activity._id);

          return (
                    <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-3xl transition duration-200 ease-in-out flex flex-col">
                              <h2>{activity.title}</h2>
                              <img
                                        src={`${activity.photos[0].split("/upload/")[0]}/upload/w_300,h_200,c_fill/${activity.photos[0].split("/upload/")[1]}`}
                                        alt={activity.title}
                                        className="w-full h-48 object-cover mt-4 rounded-lg"
                              />
                              <div className="mt-5">
                                        <p className="line-clamp-2">{activity.description}</p>
                                        <p>{new Date(activity.dateTime).toLocaleString()}</p>
                                        <p>{activity.location?.name}</p>
                                        <p>{activity.category?.name}</p>
                                        {activity.city && <p>City: {activity.city.name}</p>}
                              </div>
                              <button
                                        onClick={() => interestedInAEvent(activity._id)}
                                        disabled={isAlreadyInterested || loadingEvent === activity._id}
                                        className={`btn ${isAlreadyInterested
                                                            ? "btn-disabled bg-gray-400 hover:bg-gray-500"
                                                            : "btn-primary bg-blue-600 hover:bg-blue-700"
                                                  }`}
                              >
                                        {loadingEvent === activity._id
                                                  ? "Processing..."
                                                  : isAlreadyInterested
                                                            ? "Already Interested"
                                                            : "Interested"}
                              </button>
                    </div>
          );
};


export default ActivityCard;
