import { useState, useEffect } from 'react';
import { fetchUserData } from '../api/apiService';

export const useUsers = (authToken) => {
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
                    const fetchUser = async () => {
                              try {
                                        const response = await fetchUserData();
                                        setUser(response.data);
                                        setLoading(false);
                              } catch (error) {
                                        console.error('Error fetching user data:', error.message);
                              }
                    };

                    fetchUser();
          }, [authToken]);

          return { user, loading };
}