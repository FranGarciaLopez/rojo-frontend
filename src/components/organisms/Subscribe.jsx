import React, { useState } from 'react';

export const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [showSubscribe, setShowSubscribe] = useState(true);

  const handleSubscribe = () => {
    // Lógica para suscribirse
    console.log("Subscribed with email:", email);
    // Aquí puedes agregar lógica de redirección o cierre
  };

  const handleClose = () => {
    // Cambia el estado para ocultar el modal
    setShowSubscribe(false);
    setEmail('');  // Resetea el valor del email
  };

  return (
    <>
      {showSubscribe && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-96 relative">
            {/* Botón para cerrar el modal */}
           
            
            <h2 className="text-lg font-semibold text-gray-900">Subscribe to Newsletter</h2>
            
            <p className="text-sm text-gray-600 mt-2">Enter your email to subscribe to our newsletter.</p>

            <div className="mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mt-6 flex justify-between">
              {/* Botón de suscripción */}
              <button
                onClick={handleSubscribe}
                className="flex items-center justify-center gap-7 bg-green-400 text-sm font-medium hover:bg-green-500 text-white px-9 py-2 rounded-lg"
              >
                Subscribe
              </button>
              
              {/* Botón de cancelar */}
              <button
                onClick={handleClose}
                className="flex items-center justify-center gap-7 bg-gray-300 text-sm font-medium hover:bg-gray-500 text-white px-12 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


