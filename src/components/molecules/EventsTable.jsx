import React from "react";

export const EventsTable = ({ columns, data, onEdit, onDelete }) => {
          return (
                    <div className="mb-12">
                              <div className="overflow-x-auto min-h-[550px]">
                                        {/* Table for larger screens */}
                                        <table
                                                  data-testid="events-table"
                                                  className="hidden w-full lg:table border-collapse rounded-xl overflow-hidden bg-card shadow-sm">
                                                  <thead className="bg-muted">
                                                            <tr>
                                                                      {columns.map((column, index) => (
                                                                                <th key={`header-${index}`} className="px-6 py-4 text-left text-muted-foreground font-medium text-sm tracking-wide border-b">
                                                                                          {column.charAt(0).toUpperCase() + column.slice(1)}
                                                                                </th>
                                                                      ))}
                                                                      <th className="px-6 py-4 text-left text-muted-foreground font-medium text-sm tracking-wide border-b">Actions</th>
                                                            </tr>
                                                  </thead>
                                                  <tbody>
                                                            {data.map((event, index) => (
                                                                      <tr
                                                                                key={event._id || event.id || `event-${index}`}
                                                                                className="border-b hover:bg-muted/50 transition-all duration-200"
                                                                      >
                                                                                <td className="px-6 py-4 text-foreground">{event.title}</td>
                                                                                <td className="px-6 py-4 text-muted-foreground">{event.city ? event.city.name : "N/A"}</td>
                                                                                <td className="px-6 py-4 text-muted-foreground">{new Date(event.dateTime).toLocaleString()}</td>
                                                                                <td className="px-6 py-4">
                                                                                          <span
                                                                                                    className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary ring-1 ring-inset ring-secondary/20"
                                                                                          >
                                                                                                    {event.category ? event.category.categoryName : "N/A"}
                                                                                          </span>
                                                                                </td>
                                                                                <td className="px-6 py-4 text-right">
                                                                                          <div className="flex items-center justify-end gap-3">
                                                                                                    <button
                                                                                                              className="p-1.5 rounded-md text-primary hover:bg-primary/10 transition-colors duration-200"
                                                                                                              onClick={() => onEdit(event)}
                                                                                                    >
                                                                                                              <i className="fa-solid fa-pen-to-square"></i>
                                                                                                    </button>
                                                                                                    <button
                                                                                                              onClick={() => onDelete(event._id)}
                                                                                                              className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors duration-200"
                                                                                                    >
                                                                                                              <i className="fa-solid fa-trash-can"></i>
                                                                                                    </button>
                                                                                          </div>
                                                                                </td>
                                                                      </tr>
                                                            ))}
                                                  </tbody>
                                        </table>

                                        {/* Card layout for smaller screens */}
                                        <div className="lg:hidden space-y-4 min-h-[1200px]">
                                                  {data.map((event, index) => (
                                                            <div
                                                                      key={event._id || `event-card-${index}`}
                                                                      className="p-5 bg-card border rounded-xl shadow-sm hover:shadow transition-all duration-300"
                                                            >
                                                                      <h3 className="text-lg font-medium text-card-foreground">{event.title}</h3>
                                                                      <p className="text-muted-foreground mt-1">City: {event.city ? event.city.name : "N/A"}</p>
                                                                      <p className="text-muted-foreground mt-1">Date: {new Date(event.dateTime).toLocaleString()}</p>
                                                                      <div className="flex items-center mt-3">
                                                                                <span className="text-sm text-muted-foreground mr-2">Category:</span>
                                                                                <span
                                                                                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary/10 text-secondary"
                                                                                >
                                                                                          {event.category ? event.category.categoryName : "N/A"}
                                                                                </span>
                                                                      </div>
                                                                      <div className="mt-4 pt-3 border-t border-border flex justify-end gap-3">
                                                                                <button
                                                                                          onClick={() => onEdit(event)}
                                                                                          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                                                                                >
                                                                                          <i className="fa-solid fa-pen-to-square"></i>
                                                                                </button>
                                                                                <button
                                                                                          onClick={() => onDelete(event._id)}
                                                                                          className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors duration-200"
                                                                                >
                                                                                          <i className="fa-solid fa-trash-can"></i>
                                                                                </button>
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
};