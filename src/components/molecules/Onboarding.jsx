import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingStepOne from '../molecules/OnboardingStepOne';
import { getQuestionnaireAnswers, getQuestionnaireQuestions, sendQuestionnaireData, updateUserPreferences } from '../../api/apiService';
import { AuthContext } from '../../contexts/AuthContext';

export default function Onboarding() {
          const [questionnaire, setQuestionnaire] = useState({ questions: [], answers: {} });
          const navigate = useNavigate();
          const { authToken, user } = useContext(AuthContext);
          const userId = user?._id;
          useEffect(() => {
                    const fetchQuestionnaire = async () => {
                              try {
                                        const questionsResponse = await getQuestionnaireQuestions(authToken);
                                        const answersResponse = await getQuestionnaireAnswers(authToken);

                                        setQuestionnaire({
                                                  questions: questionsResponse ? questionsResponse.split(';') : [],
                                                  answers: answersResponse
                                                            ? answersResponse.split('|').map((group) => group.split(';'))
                                                            : {},
                                        });
                              } catch (error) {
                                        console.error('Error obteniendo los datos del cuestionario:', error);
                              }
                    };

                    if (authToken) fetchQuestionnaire();
          }, [authToken]);

          const handleSubmit = async (data) => {
                    try {
                              if (!data.questionnaireAnswers || data.questionnaireAnswers.length === 0) {
                                        console.error("No se enviaron respuestas.");
                                        return;
                              }

                              if (!userId) {
                                        console.error("Error: userId is missing!");
                                        return;
                              }

                              const requestBody = { id: userId, A_str: data.questionnaireAnswers };

                              await sendQuestionnaireData(requestBody, authToken);

                              // ✅ Update user preferences after questionnaire submission
                              await updateUserPreferences(authToken, {
                                        city: "Madrid",
                                        categoryName: "Fairs",
                                        dayOfTheWeek: "Monday", // Replace with real user input if needed
                              });

                              navigate("/dashboard");
                    } catch (error) {
                              console.error("Error enviando el cuestionario:", error);
                    }
          };

          return (
                    <>
                              <h1 className="text-3xl font-bold text-center my-10">Cuestionario</h1>
                              <OnboardingStepOne
                                        onSubmit={handleSubmit}
                                        questions={questionnaire.questions}
                                        previousAnswers={questionnaire.answers}
                              />

                    </>
          );
}
