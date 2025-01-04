import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { loginUser } from "../../api/apiService";
import InputText from "../atoms/InputText";
import Buttons from "../atoms/Buttons";
import Alert from "../atoms/Alert";

const LoginForm = () => {
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [alert, setAlert] = useState(null);
          const { login, loading, user } = useContext(AuthContext);
          const navigate = useNavigate();

          const handleSubmit = async (e) => {
                    e.preventDefault();
                    try {
                              const response = await loginUser({ email, password });
                              const { token, requiresOnboarding, user, isAdmin } = response.data;
                              login(token, user);

                              if (requiresOnboarding) {
                                        navigate("/onboarding");
                              } else {
                                        navigate(isAdmin ? "/admin" : "/dashboard");
                              }
                    } catch (error) {
                              const errorMessage =
                                        error.response?.data?.message || "Invalid credentials";
                              setAlert({ message: errorMessage, type: "error" });
                    }
          };

          useEffect(() => {
                    if (user) {
                              navigate(user.isAdmin ? "/admin" : "/dashboard");
                    }
          }, [user, navigate]);

          if (loading) return <div>Loading...</div>;

          return (
                    <div className="flex flex-grow justify-center items-center bg-white p-6">
                              <form onSubmit={handleSubmit}>
                                        <h2 className="text-center mb-8">Login</h2>
                                        {alert && (
                                                  <div className="relative top-0 right-0 w-full px-4">
                                                            <Alert
                                                                      message={alert.message}
                                                                      type={alert.type}
                                                                      onClose={() => setAlert(null)}
                                                            />
                                                  </div>
                                        )}
                                        <div className="space-y-4 mb-4">
                                                  <InputText
                                                            type="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                  />
                                                  <InputText
                                                            type="password"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                  />
                                        </div>
                                        <div className="mt-4">
                                                  <Buttons
                                                            type="submit"
                                                            value="Login"
                                                            className="bg-blue-600 hover:bg-blue-800"
                                                  />
                                        </div>
                                        <div className="text-center mt-4">
                                                  <p className="text-gray-700">
                                                            Don't have an account?{" "}
                                                            <Link
                                                                      to="/register"
                                                                      className="text-blue-600 hover:underline"
                                                            >
                                                                      Register
                                                            </Link>
                                                  </p>
                                                  <p className="text-gray-700">
                                                            <Link
                                                                      to="/forgotpassword"
                                                                      className="text-blue-600 hover:underline"
                                                            >
                                                                      Forgot Password
                                                            </Link>
                                                            ?
                                                  </p>
                                        </div>
                              </form>
                    </div>
          );
};

export default LoginForm;
