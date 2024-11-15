const Table = ({ columns, data }) => {
          return (
                    <div className="mb-12">
                              <div className="overflow-x-auto">
                                        {/* Table for larger screens */}
                                        <table className="table-auto w-full text-left hidden lg:table">
                                                  <thead>
                                                            <tr className="bg-gray-100">
                                                                      {columns.map((column, index) => (
                                                                                <th key={index} className="px-4 py-2">
                                                                                          {column.charAt(0).toUpperCase() + column.slice(1)}
                                                                                </th>
                                                                      ))}
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {data.map((user) => (
                                                                      <tr key={user.id} className="border-t hover:bg-gray-100 transition 
                                                                      delay-50 ease-in-out">
                                                                                <td className="px-4 py-2">{`${user.firstname} ${user.lastname}`}</td>
                                                                                <td className="px-4 py-2">{user.email}</td>
                                                                                {user.isAdministrator ? (
                                                                                          <td className="px-4 py-2">
                                                                                                    <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transform transition-all duration-200">
                                                                                                              Admin
                                                                                                    </span>
                                                                                          </td>
                                                                                ) : (
                                                                                          <td className="px-4 py-2">
                                                                                                    <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transform transition-all duration-200">
                                                                                                              User
                                                                                                    </span>
                                                                                          </td>
                                                                                )}
                                                                                <td className="px-4 py-2">
                                                                                          <button className="text-blue-500 hover:underline">
                                                                                                    <i className="fa-solid fa-pen-to-square hover:text-blue-800"></i>
                                                                                          </button>
                                                                                          <button className="ml-4 text-red-600 hover:underline">
                                                                                                    <i className="fa-solid fa-trash-can hover:text-red-800"></i>
                                                                                          </button>
                                                                                </td>
                                                                      </tr>
                                                            ))}
                                                  </tbody>
                                        </table>

                                        {/* Card layout for smaller screens */}
                                        <div className="lg:hidden">
                                                  {data.map((user) => (
                                                            <div
                                                                      key={user.id}
                                                                      className="p-4 mb-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition duration-200 ease-in-out"
                                                            >
                                                                      <h3 className="font-semibold">{`${user.firstname} ${user.lastname}`}</h3>
                                                                      <p className="text-gray-600">{user.email}</p>
                                                                      {user.isAdministrator ? (
                                                                                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                                                          Admin
                                                                                </span>
                                                                      ) : (
                                                                                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                                                                                          User
                                                                                </span>
                                                                      )}
                                                                      <div className="mt-2 flex justify-end">
                                                                                <button className="text-blue-600 hover:underline mr-4">
                                                                                          <i className="fa-solid fa-pen-to-square hover:text-blue-800"></i>
                                                                                </button>
                                                                                <button className="text-red-600 hover:underline">
                                                                                          <i className="fa-solid fa-trash-can hover:text-red-800"></i>
                                                                                </button>
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
};

export default Table;
