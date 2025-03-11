import React, { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../../hooks/useCities';
import { registerUser } from '../../api/apiService';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const [city, setCity] = useState('');
  const { cities, loading } = useCities();
  const uniqueCities = cities.reduce((acc, city) => {
    if (!acc.some((c) => c.name === city.name)) {
      acc.push(city);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (!loading && cities.length > 0) {
      setCity(cities[0].name);
    }
  }, [loading, cities]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        firstname,
        lastname,
        email,
        password,
        city,
        dateOfBirth,
      });

      register(response);
      setTimeout(() => {
        navigate('/login');
      }, 0);
    } catch (error) {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        const errorMessage = error.response?.data?.message || "Bad request";
        setAlert({ message: errorMessage, type: "error" });
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-grow justify-center items-center m-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold mb-6">Register</h2>

            {alert && (
              <Alert
                variant="destructive"
                className="mb-4"
                onClose={() => setAlert(null)}
              >
                {alert.message}
              </Alert>
            )}

            <div className="space-y-4">
              {/* First Name */}
              <Input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />

              {/* Last Name */}
              <Input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />

              {/* Email */}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password */}
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />

              {/* City */}
              <Select value={city} onValueChange={(value) => setCity(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your city" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCities.map((city, index) => (
                    <SelectItem key={city._id || index} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Date of Birth */}
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
