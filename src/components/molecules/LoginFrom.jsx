import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { loginUser } from "../../api/apiService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

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
      const { token, user, isAdmin } = response.data;
      login(token, user);

      if (user.requiresOnboarding) {
        navigate(`/onboarding/${user._id}`);
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
    <div className="flex flex-grow justify-center items-center">
      <Card className="w-full max-w-md m-4">
        <CardContent>
          <form onSubmit={handleSubmit} data-testid="login-form">
            <h2 className="text-center mb-8 text-2xl font-bold">Login</h2>

            {alert && (
              <Alert
                variant="destructive"
                className="mb-4"
                onClose={() => setAlert(null)}
              >
                {alert.message}
              </Alert>
            )}

            <div className="space-y-4 mb-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>

            <div className="mt-4">
              <Button type="submit" size="lg" className="w-full">
                Login
              </Button>
            </div>

            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="hover:underline text-link hover:text-link-hover"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/forgotpassword"
                  className="hover:underline text-link hover:text-link-hover"
                >
                  Forgot Password
                </Link>
                ?
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
