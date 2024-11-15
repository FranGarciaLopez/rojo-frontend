import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingStepOne from './../atoms/OnboardingStepOne';
import { updateUserPreferences } from '../../api/apiService'; // Import the new function
import { AuthContext } from '../../contexts/AuthContext';

export default function Onboarding() {
          const [currentStep, setCurrentStep] = useState(0);
          const navigate = useNavigate();
          const { authToken } = useContext(AuthContext);

          const handleSubmit = async (data) => {
                    try {
                              const { city, categoryName, dayOfTheWeek } = data;

                              // Prepare the preferences object
                              const preferences = {
                                        city,
                                        categoryName,
                                        dayOfTheWeek,
                              };

                              // Call updateUserPreferences with authToken and preferences
                              const response = await updateUserPreferences(authToken, preferences);

                              if (response.status === 200) {
                                        navigate('/'); // Navigate to the home or desired page
                              } else {
                                        console.error('Failed to update preferences');
                              }
                    } catch (error) {
                              console.error('Error submitting user data:', error);
                    }
          };

          const steps = [
                    <OnboardingStepOne onSubmit={handleSubmit} />,
          ];

          return (
                    <div className="flex flex-col justify-evenly h-screen p-10 gap-5">
                              <h1>Step {currentStep + 1}</h1>
                              {steps[currentStep]}

                              {/* Optionally, add "Next" button */}
                              <div className="flex flex-row items-end">
                                        {currentStep < steps.length - 1 && (
                                                  <button
                                                            onClick={() => setCurrentStep(currentStep + 1)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                                  >
                                                            Next
                                                  </button>
                                        )}
                              </div>
                    </div>
          );
}
