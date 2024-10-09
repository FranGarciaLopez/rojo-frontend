
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const PrivateRoute = ({ children }) => {
          const { authToken } = useContext(AuthContext);

          return (
                    authToken ? children : <Navigate to="/login" />
          );
};