import React from "react";

const Table = ({ columns, data, onDelete, onEdit }) => {
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
                        {data.map((user) => (
                            <tr
                                key={user._id}
                                className="border-t hover:bg-gray-100 transition delay-50 ease-in-out"
                            >
                                <td className="px-4 py-2">{`${user.firstname} ${user.lastname}`}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`bg-gradient-to-r px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transform transition-all duration-200 ${
                                            user.isAdministrator
                                                ? "from-blue-400 via-blue-500 to-blue-600 text-white"
                                                : "from-green-400 via-green-500 to-green-600 text-white"
                                        }`}
                                    >
                                        {user.isAdministrator ? "Admin" : "User"}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => onEdit(user)}
                                    >
                                        <i className="fa-solid fa-pen-to-square hover:text-blue-800"></i>
                                    </button>
                                    <button
                                        onClick={() => onDelete(user._id)}
                                        className="ml-4 text-red-600 hover:underline"
                                    >
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
                            key={user._id}
                            className="p-4 mb-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-200 ease-in-out"
                        >
                            <h3 className="font-semibold">{`${user.firstname} ${user.lastname}`}</h3>
                            <p className="text-gray-600">Email: {user.email}</p>
                            <p className="text-gray-600">
                                Role:{" "}
                                <span
                                    className={`font-bold ${
                                        user.isAdministrator ? "text-blue-600" : "text-green-600"
                                    }`}
                                >
                                    {user.isAdministrator ? "Admin" : "User"}
                                </span>
                            </p>
                            <div className="mt-2 flex justify-end">
                                <button
                                    onClick={() => onEdit(user)}
                                    className="text-blue-600 hover:underline mr-4"
                                >
                                    <i className="fa-solid fa-pen-to-square hover:text-blue-800"></i>
                                </button>
                                <button
                                    onClick={() => onDelete(user._id)}
                                    className="text-red-600 hover:underline"
                                >
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
