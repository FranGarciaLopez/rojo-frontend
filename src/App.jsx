import React from "react"
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./components/organisms/Home";
import { Login } from "./components/organisms/Login";
import { Register } from './components/organisms/Register';
import { Dashboard } from "./components/organisms/Dashboard";

import { UserSettings } from "./components/organisms/UserSettings";


function App() {
       return (
              <AuthProvider>
                     <Router>
                            <Routes>
                                   <Route path="/" element={<Home />} />
                                   <Route path="/login" element={<Login />} />
                                   <Route path="/register" element={<Register />} />
                                   <Route path="/usersettings" element={<UserSettings />} />
                               
                                   <Route
                                          path="/dashboard"
                                          element={
                                                 <PrivateRoute>
                                                        <Dashboard />
                                                 </PrivateRoute>
                                          }
                                   />


                                   <Route path="/admin" element={
                                          <PrivateRoute>
                                                 <h1><AdminDashboard /></h1>
                                          </PrivateRoute>
                                   } />
                                                                                      
                                   <Route path="*" element={<h1>Not Found</h1>} />
                            </Routes>
                     </Router>
              </AuthProvider>
       )
}

export default App
