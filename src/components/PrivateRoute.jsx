import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const PrivateRoute = ({ children, adminRequired = false }) => {
          const { user, loading } = useContext(AuthContext);

          // Handle the loading state before rendering the children
          if (loading) {
                    return <div>Loading...</div>; // Or a spinner/loading animation
          }

          // If user is authenticated
          if (user) {
                    // If admin route is required, check if the user is an admin
                    if (adminRequired && !user.isAdministrator) {
                              // Non-admin users should be redirected to the user dashboard
                              return <Navigate to="/dashboard" />;
                    }

                    // If the user is an admin and tries to access the user dashboard, redirect to /admin
                    if (!adminRequired && user.isAdministrator) {
                              return <Navigate to="/admin" />;
                    }

                    // If no admin restriction, proceed with the route
                    return children;
          }

          // If not authenticated, redirect to login page
          return <Navigate to="/login" />;
};
