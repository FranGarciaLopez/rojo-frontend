import { useState, useEffect } from 'react';
import { fetchCities } from '../api/apiService';

export const useCities = () => {
          const [cities, setCities] = useState([]);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
                    const fetchCitiesData = async () => {
                              try {
                                        const response = await fetchCities();
                                        setCities(response.data);
                                        setLoading(false);
                              } catch (error) {
                                        console.error('Error fetching cities:', error.message);
                              }
                    };

                    fetchCitiesData();
          }, []);

          return { cities, loading };
};
