import React from "react";

export const EventsTable = ({ columns, data, onEdit, onDelete }) => {
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
                                                                      <th className="px-4 py-2">Actions</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {data.map((event) => (
                                                                      <tr key={event._id} className="border-t hover:bg-gray-100 transition delay-50 ease-in-out">
                                                                                <td className="px-4 py-2">{event.title}</td>
                                                                                <td className="px-4 py-2">{event.city ? event.city.name : "N/A"}</td>
                                                                                <td className="px-4 py-2">{new Date(event.dateTime).toLocaleString()}</td>
                                                                                <td className="px-4 py-2">{event.category ? event.category.categoryName : "N/A"}</td>
                                                                                <td className="px-4 py-2">
                                                                                          <button onClick={() => onEdit(event)} className="text-blue-500 hover:underline">
                                                                                                    <i className="fa-solid fa-pen-to-square hover:text-blue-800"></i>
                                                                                          </button>
                                                                                          <button onClick={() => onDelete(event._id)} className="ml-4 text-red-600 hover:underline">
                                                                                                    <i className="fa-solid fa-trash-can hover:text-red-800"></i>
                                                                                          </button>
                                                                                </td>
                                                                      </tr>
                                                            ))}
                                                  </tbody>
                                        </table>

                                        {/* Card layout for smaller screens */}
                                        <div className="lg:hidden">
                                                  {data.map((event) => (
                                                            <div
                                                                      key={event._id}
                                                                      className="p-4 mb-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition duration-200 ease-in-out"
                                                            >
                                                                      <h3 className="font-semibold">{event.title}</h3>
                                                                      <p className="text-gray-600">City: {event.city ? event.city.name : "N/A"}</p>
                                                                      <p className="text-gray-600">Date: {new Date(event.dateTime).toLocaleString()}</p>
                                                                      <p className="text-gray-600">Category: {event.category ? event.category.categoryName : "N/A"}</p>
                                                                      <div className="mt-2 flex justify-end">
                                                                                <button onClick={() => onEdit(event)} className="text-blue-600 hover:underline mr-4">
                                                                                          <i className="fa-solid fa-pen-to-square hover:text-blue-800"></i>
                                                                                </button>
                                                                                <button onClick={() => onDelete(event._id)} className="text-red-600 hover:underline">
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
