import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext"; // Use AuthContext
import { PrivateRoute } from "./components/PrivateRoute";

// Public Pages
import { Home } from "./components/organisms/Home";
import { Login } from "./components/organisms/Login";
import { Register } from "./components/organisms/Register";
import { ForgotPassword } from "./components/organisms/ForgotPassword";

// User Pages
import { Dashboard } from "./components/organisms/Dashboard";
import { UserSettings } from "./components/organisms/UserSettings";
import { OnboardingDashboard } from "./components/organisms/OnboardingDashboard";

// Admin Pages
import { AdminDashboard } from "./components/organisms/AdminDashboard";

// Blog Pages
import { Blog } from "./components/organisms/Blog";
import { BlogPageDetails } from "./components/molecules/BlogDetailsPage";

// Event Pages
import { CreateEvent } from "./components/molecules/CreateEventForm";
import { EditEvent } from "./components/molecules/EditEvent";
import { EventGroupPage } from "./components/organisms/EventGroupPage";
import EventDetails from "./components/molecules/EventDetails";

function App() {
       const { authToken } = useContext(AuthContext);

       return (
              <Router>
                     <Routes>
                            {/* Redirect Root Path */}
                            <Route
                                   path="/"
                                   element={authToken ? <Navigate to="/dashboard" /> : <Navigate to="/home" />}
                            />

                            {/* Public Routes */}
                            <Route path="/home" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgotpassword" element={<ForgotPassword />} />

                            {/* User Routes */}
                            <Route
                                   path="/dashboard"
                                   element={
                                          <PrivateRoute>
                                                 <Dashboard />
                                          </PrivateRoute>
                                   }
                            />
                            <Route
                                   path="/usersettings"
                                   element={
                                          authToken ? <UserSettings /> : <Navigate to="/login" />
                                   }
                            />
                            <Route
                                   path="/onboarding"
                                   element={
                                          <PrivateRoute>
                                                 <OnboardingDashboard />
                                          </PrivateRoute>
                                   }
                            />

                            {/* Blog Route */}
                            <Route
                                   path="/blog"
                                   element={
                                          authToken ? <Blog /> : <Navigate to="/login" />
                                   }
                            />

                            <Route
                                   path="/blog/:id"
                                   element={ authToken ? <BlogPageDetails /> : <Navigate to="/login" /> }
                            />

                            {/* Admin Routes */}
                            <Route
                                   path="/admin"
                                   element={
                                          <PrivateRoute adminRequired={true}>
                                                 <AdminDashboard />
                                          </PrivateRoute>
                                   }
                            />

                            {/* Event Routes */}
                            <Route
                                   path="/create-event"
                                   element={
                                          authToken ? <CreateEvent /> : <Navigate to="/login" />
                                   }
                            />
                            <Route
                                   path="/edit-event/:id"
                                   element={
                                          authToken ? <EditEvent /> : <Navigate to="/login" />
                                   }
                            />
                            <Route
                                   path="/events/:eventId/groups/:groupId"
                                   element={
                                          authToken ? <EventGroupPage /> : <Navigate to="/login" />
                                   }
                            />

                            <Route
                                   path="/events/:id"
                                   element={
                                          authToken ? <EventDetails /> : <Navigate to="/login" />
                                   }
                            />

                            {/* Catch-All Route */}
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
