import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./contexts/AuthContext"; // Use AuthContext
import { PrivateRoute } from "./components/PrivateRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./components/organisms/Home";
import { Login } from "./components/organisms/Login";
import { Register } from './components/organisms/Register';
import { Dashboard } from "./components/organisms/Dashboard";
import { UserSettings } from "./components/organisms/UserSettings";
import { CreateEvent } from "./components/molecules/CreateEventForm";
import { AdminDashboard } from "./components/organisms/AdminDashboard";
import { OnboardingDashboard } from "./components/organisms/OnboardingDashboard";

function App() {
       const { authToken } = useContext(AuthContext);

       return (
              <Router>
                     <Routes>
                            {/* Redirect "/" based on authentication status */}
                            <Route path="/" element={authToken ? <Navigate to="/dashboard" /> : <Navigate to="/home" />} />

                            {/* Define other routes */}
                            <Route path="/home" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/usersettings" element={<UserSettings />} />
                            <Route path="/CreateEventForm" element={<CreateEvent />} />

                            {/* Protected Routes */}
                            <Route path="/onboarding" element={
                                   <PrivateRoute>
                                          <OnboardingDashboard />
                                   </PrivateRoute>
                            } />

                            <Route path="/dashboard" element={
                                   <PrivateRoute>
                                          <Dashboard />
                                   </PrivateRoute>
                            } />

                            <Route path="/admin" element={
                                   <PrivateRoute>
                                          <AdminDashboard />
                                   </PrivateRoute>
                            } />

                            <Route path="*" element={<h1>Not Found</h1>} />
                     </Routes>
              </Router>
       );
}

// Wrap App with AuthProvider
export default function RootApp() {
       return (
              <AuthProvider>
                     <App />
              </AuthProvider>
       );
}