import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext"; // Use AuthContext
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./components/organisms/Home";
import { Login } from "./components/organisms/Login";
import { Register } from "./components/organisms/Register";
import { Dashboard } from "./components/organisms/Dashboard";
import { AdminDashboard } from "./components/organisms/AdminDashboard";
import { OnboardingDashboard } from "./components/organisms/OnboardingDashboard";
import { Blog } from "./components/organisms/Blog";
import { UserSettings } from "./components/organisms/UserSettings";
import { CreateEvent } from "./components/molecules/CreateEventForm";
import { ForgotPassword } from "./components/organisms/ForgotPassword";
import { EditEvent } from "./components/molecules/EditEvent";
import { EventGroupPage } from "./components/organisms/EventGroupPage";

function App() {
       const { authToken } = useContext(AuthContext);

       return (
              <Router>
                     <Routes>
                            {/* Redirect "/" based on authentication status */}
                            <Route
                                   path="/"
                                   element={authToken ? <Navigate to="/dashboard" /> : <Navigate to="/home" />}
                            />

                            <Route path="/events/:eventId/groups/:groupId" element={<EventGroupPage />} />


                            {/* Define other routes */}
                            <Route path="/home" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />


                            <Route path="/CreateEventForm"
                                   element={authToken ?
                                          <CreateEvent /> :
                                          <Navigate to="/login" />
                                   } />


                            <Route path="/blog"
                                   element={authToken ?
                                          <Blog /> :
                                          <Navigate to="/login" />
                                   } />

                            <Route path="/forgotpassword"
                                   element={<ForgotPassword />} />

                            <Route path="/edit-event/:id"
                                   element={authToken ?
                                          <EditEvent /> :
                                          <Navigate to="/login" />
                                   } />


                            <Route path="/usersettings" element=
                                   {authToken ? <UserSettings /> : <Navigate to="/login" />}
                            />

                            <Route path="/CreateEventForm"
                                   element={
                                          authToken ? <CreateEvent /> : <Navigate to="/login" />
                                   }
                            />

                            {/* Protected Routes */}
                            <Route
                                   path="/onboarding"
                                   element={
                                          <PrivateRoute>
                                                 <OnboardingDashboard />
                                          </PrivateRoute>
                                   }
                            />


                            {/* Normal user dashboard route */}
                            <Route
                                   path="/dashboard"
                                   element={
                                          <PrivateRoute>
                                                 <Dashboard />
                                          </PrivateRoute>
                                   }
                            />

                            {/* Admin route with restricted access */}
                            <Route
                                   path="/admin"
                                   element={
                                          <PrivateRoute adminRequired={true}>
                                                 <AdminDashboard />
                                          </PrivateRoute>
                                   }
                            />

                            {/* Catch-all route for non-existing routes */}
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
