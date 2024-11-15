import { useState, useEffect } from 'react';
import { fetchCities, fetchActivitiesCategories } from '../../api/apiService';

const OnboardingStepOne = ({ onSubmit }) => {
          const [city, setCity] = useState('');
          const [cities, setCities] = useState([]);
          const [categories, setCategories] = useState([]);
          const [categoryName, setCategoryName] = useState(''); // Track selected category
          const [dayOfTheWeek, setDayOfTheWeek] = useState('');
          const [daysOfTheWeek] = useState([
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
          ]);

          // Fetch activity categories
          useEffect(() => {
                    const getCategories = async () => {
                              try {
                                        const response = await fetchActivitiesCategories();
                                        setCategories(response.data); // Assuming response.data contains the categories
                              } catch (error) {
                                        console.error("Error fetching activities:", error.message);
                              }
                    };
                    getCategories();
          }, []);

          // Fetch cities
          useEffect(() => {
                    const getCities = async () => {
                              try {
                                        const response = await fetchCities();
                                        setCities(response.data); // Assuming response.data contains the cities
                              } catch (error) {
                                        console.error("Error fetching cities:", error.message);
                              }
                    };
                    getCities();
          }, []);

          // Handle form submission
          const handleSubmit = (e) => {
                    e.preventDefault();
                    // Gather all the data
                    const data = {
                              city,
                              categoryName, // No need to repeat categoryName in the object since it already has the same name as the variable
                              dayOfTheWeek,
                    };

                    onSubmit(data); // Passing data to parent component or handler function
          };

          return (
                    <form onSubmit={handleSubmit}>
                              <h1>Step 1: Choose your preferences</h1>

                              {/* City selection */}
                              <select
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                              >
                                        <option value="">Choose your City</option>
                                        {cities.map((city) => (
                                                  <option key={city._id} value={city.name}>
                                                            {city.name}
                                                  </option>
                                        ))}
                              </select>

                              {/* Activity Category selection */}
                              <select
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        required
                              >
                                        <option value="">Choose your preferred Activity</option>
                                        {categories.map((category) => (
                                                  <option key={category._id} value={category.categoryName}>
                                                            {category.categoryName}
                                                  </option>
                                        ))}
                              </select>

                              {/* Day of the Week selection */}
                              <select
                                        value={dayOfTheWeek}
                                        onChange={(e) => setDayOfTheWeek(e.target.value)}
                                        required
                              >
                                        <option value="">Choose your preferred Day</option>
                                        {daysOfTheWeek.map((day) => (
                                                  <option key={day} value={day}>
                                                            {day}
                                                  </option>
                                        ))}
                              </select>

                              {/* Submit button */}
                              <button type="submit" className="bg-blue-500 hover:bg-blue-600">
                                        Finish
                              </button>
                    </form>
          );
};

export default OnboardingStepOne;
