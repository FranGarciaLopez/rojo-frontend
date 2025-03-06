import { useState, useEffect } from 'react';

const OnboardingStepOne = ({ onSubmit, questions = [], previousAnswers = [] }) => {
          // Initialize answers correctly from previous answers
          const [answers, setAnswers] = useState(() => {
                    return previousAnswers.length > 0
                              ? previousAnswers.reduce((acc, answerGroup, index) => {
                                        acc[index] = answerGroup; // Store each set of answers per question
                                        return acc;
                              }, {})
                              : questions.reduce((acc, _, index) => {
                                        acc[index] = []; // Empty array for new responses
                                        return acc;
                              }, {});
          });

          // Handle checkbox selection
          const handleCheckboxChange = (questionIndex, answer) => {
                    setAnswers((prevAnswers) => {
                              const updatedAnswers = { ...prevAnswers };

                              // Ensure only one answer is selected per question
                              updatedAnswers[questionIndex] = [answer];
                              return updatedAnswers;
                    });
          };

          const handleSubmit = async (e) => {
                    e.preventDefault();

                    const formattedAnswers = Object.values(answers).map((group) => group.join(';')).join('|');

                    if (!formattedAnswers || formattedAnswers.trim() === '') {
                              console.error("No se han seleccionado respuestas válidas.");
                              return;
                    }

                    onSubmit({ questionnaireAnswers: formattedAnswers });
          };

          return (
                    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
                              <form
                                        onSubmit={handleSubmit}
                                        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"
                              >

                                        <div className="space-y-6">
                                                  {questions.map((question, qIndex) => (
                                                            <div key={qIndex} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                                                                      <p className="font-semibold mb-2">{question}</p>
                                                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                                                {[
                                                                                          `Answer1-0${qIndex + 1}`,
                                                                                          `Answer2-0${qIndex + 1}`,
                                                                                          `Answer3-0${qIndex + 1}`,
                                                                                          `Answer4-0${qIndex + 1}`,
                                                                                          `Answer5-0${qIndex + 1}`,
                                                                                ].map((answer, aIndex) => (
                                                                                          <label
                                                                                                    key={aIndex}
                                                                                                    className="flex items-center space-x-2 p-2 bg-white shadow-sm rounded-lg border border-gray-200"
                                                                                          >
                                                                                                    <input
                                                                                                              type="checkbox"
                                                                                                              className="form-checkbox text-blue-600 h-5 w-5"
                                                                                                              checked={answers[qIndex]?.includes(answer) || false}
                                                                                                              onChange={() => handleCheckboxChange(qIndex, answer)}
                                                                                                    />
                                                                                                    <span className="text-gray-700">{answer}</span>
                                                                                          </label>
                                                                                ))}
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>

                                        <div className="flex justify-center mt-6">
                                                  <button
                                                            type="submit"
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                                                  >
                                                            Enviar
                                                  </button>
                                        </div>
                              </form>
                    </div>
          );
};

export default OnboardingStepOne;
