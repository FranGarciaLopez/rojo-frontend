import React, { useState, useEffect, useContext } from "react";
import NavBar from "../molecules/NavBar";
import { AuthContext } from "../../contexts/AuthContext";
import { getUsers } from "../../api/apiService";
import Pagination from "../molecules/Pagination";
import Table from "../molecules/Table"; // Import your Table component
import GridSection from "../atoms/GridSection";

export const AdminDashboard = () => {
          const [users, setUsers] = useState([]);
          const [loading, setLoading] = useState(true);
          const { authToken } = useContext(AuthContext);
          const { user } = useContext(AuthContext);

          const [currentPage, setCurrentPage] = useState(1);
          const usersPerPage = 5;
          const indexOfLastUser = currentPage * usersPerPage;
          const indexOfFirstUser = indexOfLastUser - usersPerPage;
          const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

          useEffect(() => {
                    const fetchData = async () => {
                              try {
                                        setLoading(true);
                                        const usersResponse = await getUsers(); // Fetch users from your API
                                        setUsers(usersResponse.data.users);
                              } catch (error) {
                                        console.error("Error fetching data:", error);
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchData();
          }, [authToken]);

          // Calculate the total number of pages
          const totalPages = Math.ceil(users.length / usersPerPage);
          const pageNumbers = [];
          for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
          }

          const handlePageClick = (pageNumber) => {
                    setCurrentPage(pageNumber);
          };

          if (loading) {
                    return (
                              <div className="p-10 flex justify-center items-center">
                                        <p className="text-gray-600">Loading...</p>
                              </div>
                    );
          }

          return (
                    <>
                              <NavBar />

                              <div className="p-10 max-w-6xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

                                        {/* Analytics Section */}
                                        <div className="my-8">
                                                  <h2>Analytics</h2>
                                                  <GridSection>
                                                            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                                                                      <h3 className="text-2xl font-bold">Total Users</h3>
                                                                      <p className="text-xl">{users.length}</p>
                                                            </div>
                                                            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                                                                      <h3 className="text-2xl font-bold">Created Events</h3>
                                                                      <p className="text-xl">{user.user.organizedEvents}</p>
                                                            </div>
                                                  </GridSection>
                                        </div>

                                        {/* Manage Users Section */}
                                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Users</h2>

                                        {/* Table for users */}
                                        <Table columns={["First Name", "Email", "Role", "Actions"]} data={currentUsers} />

                                        {/* Pagination */}
                                        <Pagination
                                                  currentPage={currentPage}
                                                  totalPages={totalPages}
                                                  pageNumbers={pageNumbers}
                                                  handlePageClick={handlePageClick}
                                        />
                              </div>
                    </>
          );
};
