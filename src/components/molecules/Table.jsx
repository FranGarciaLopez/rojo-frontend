import React from "react"
// Import the shadcn/ui table components
import {
    Table as ShadcnTable,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../ui/table" // adjust path as needed

const Table = ({ columns, data, onDelete, onEdit }) => {
    return (
        <div className="mb-12">
            <div className="overflow-x-auto min-h-[520px]">
                {/* Shadcn table for larger screens */}
                <ShadcnTable className="hidden w-full lg:table border-collapse rounded-xl overflow-hidden bg-card shadow-sm">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={`header-${index}`} className="px-6 py-4 text-left text-muted-foreground font-medium text-sm tracking-wide border-b">
                                    {column.charAt(0).toUpperCase() + column.slice(1)}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((user, index) => (
                            <TableRow
                                key={user._id || user.id || `user-${index}`}
                                className="border-b hover:bg-muted/50 transition-all duration-200"
                            >
                                <TableCell className="px-6 py-4 text-foreground">{`${user.firstname} ${user.lastname}`}</TableCell>
                                <TableCell className="px-6 py-4 text-muted-foreground">{user.email}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${user.isAdministrator
                                            ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                                            : "bg-secondary-foreground/10 text-secondary-foreground ring-1 ring-inset ring-secondary/20"
                                            }`}
                                    >
                                        {user.isAdministrator ? "Admin" : "User"}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            className="p-1.5 rounded-md text-primary hover:bg-primary/10 transition-colors duration-200"
                                            onClick={() => onEdit?.(user)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            onClick={() => onDelete?.(user._id)}
                                            className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors duration-200"
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ShadcnTable>

                {/* Card layout for smaller screens */}
                <div className="lg:hidden space-y-4 min-h-[1040px]">
                    {data.map((user, index) => (
                        <div
                            key={user._id || `user-card-${index}`}
                            className="p-5 bg-card border rounded-xl shadow-sm hover:shadow transition-all duration-300"
                        >
                            <h3 className="text-lg font-medium text-card-foreground">{`${user.firstname} ${user.lastname}`}</h3>
                            <p className="text-muted-foreground mt-1">{user.email}</p>
                            <div className="flex items-center mt-3">
                                <span className="text-sm text-gray-500 mr-2">Role:</span>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${user.isAdministrator
                                        ? "bg-blue-50 text-blue-700"
                                        : "bg-green-50 text-green-700"
                                        }`}
                                >
                                    {user.isAdministrator ? "Admin" : "User"}
                                </span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-border flex justify-end gap-3">
                                <button
                                    onClick={() => onEdit?.(user)}
                                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                    onClick={() => onDelete?.(user._id)}
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
    )
}

export default Table