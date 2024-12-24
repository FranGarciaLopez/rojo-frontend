import React, { useState } from "react";

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [showSubscribe, setShowSubscribe] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageType, setMessageType] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setSuccessMessage("Please enter a valid email!");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage(
          "You have successfully subscribed! A confirmation email has been sent."
          
        );
        setMessageType("success");
      
        setTimeout(() => {
          setSuccessMessage("");
          setEmail("");
        }, 5000);
      } else {
        setSuccessMessage("You are already subscribed to the newsletter.");
        setMessageType("error");

        setTimeout(() => {
          setSuccessMessage("");
          setEmail("");
        }, 5000);
      
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageType("error");
      setSuccessMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
   
    }
  };

  const handleClose = () => {
    setShowSubscribe(false);
  };

  

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    setShowSubscribe(false);
  };

  return (
    <>
      {showSubscribe && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg sm:w-96 relative"
            onClick={handleModalClick}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 flex items-center justify-center gap-2 bg-gray-300 text-sm font-medium hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                X
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                Subscribe to Newsletter
              </h2>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Enter your email to subscribe to our newsletter.
            </p>

            {successMessage && (
              <div
                className={`mt-4 p-3 rounded-md ${
                  messageType === "error"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {successMessage}
              </div>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-6 flex justify-between">
              {}
              <button
                onClick={handleSubscribe}
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-7 ${
                  isSubmitting ? "bg-gray-400" : "bg-green-400"
                } text-sm font-medium hover:bg-green-500 text-white px-9 py-2 rounded-lg w-max mx-auto`}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>

             
            </div>
          </div>
        </div>
      )}
    </>
  );
};
