
const GroupSection = ({ groupDetails, openEventGroupPage }) => (
          <section className="flex flex-row items-center justify-between w-full px-6 py-4 bg-gray-50">
                    <h1>Explore Activities</h1>
                    <small>
                              {groupDetails.map((group) => (
                                        <div key={group._id}>
                                                  {group.interestedEvents?.length > 0 ? (
                                                            <button
                                                                      onClick={() => openEventGroupPage(group.interestedEvents[0], group._id)}
                                                                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                            >
                                                                      Join Group Chat
                                                            </button>
                                                  ) : (
                                                            <p className="text-gray-500 mt-2">This group has no associated event.</p>
                                                  )}
                                        </div>
                              ))}
                    </small>
          </section>
);

export default GroupSection;