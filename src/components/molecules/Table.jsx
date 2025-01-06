const Table = ({ columns, data, onDelete }) => {
          return (
              <div className="mb-12">
                  <div className="overflow-x-auto">
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
                                  <tr
                                      key={user._id}
                                      className="border-t hover:bg-gray-100 transition delay-50 ease-in-out"
                                  >
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
                                          <button
                                              className="text-blue-500 hover:underline"
                                              onClick={() => console.log(`Edit user: ${user._id}`)}
                                          >
                                              <i className="fa-solid fa-pen-to-square hover:text-blue-800"></i>
                                          </button>
                                          <button
                                              onClick={() => onDelete(user._id)} // Pass the correct user ID
                                              className="ml-4 text-red-600 hover:underline"
                                          >
                                              <i className="fa-solid fa-trash-can hover:text-red-800"></i>
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          );
      };
      
      export default Table;
      