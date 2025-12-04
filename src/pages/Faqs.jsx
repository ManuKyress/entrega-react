import { useState } from 'react';

const preguntasFrecuentes = [
  {
    id: 1,
    pregunta: "¿Cuáles son los métodos de pago aceptados?",
    respuesta: "Aceptamos tarjetas de crédito/débito (Visa, Mastercard), PayPal y transferencias bancarias. Todas las transacciones son seguras y están cifradas."
  },
  {
    id: 2,
    pregunta: "¿Cuál es el costo y tiempo de envío?",
    respuesta: "El envío estándar tiene un costo de $15 y toma entre 3 a 5 días hábiles. Ofrecemos envío gratuito en pedidos superiores a $100."
  },
  {
    id: 3,
    pregunta: "¿Puedo devolver o cambiar un producto?",
    respuesta: "Sí, aceptamos devoluciones y cambios dentro de los 30 días posteriores a la recepción, siempre y cuando el producto esté sin usar y en su embalaje original. Consulta nuestra política de devoluciones completa."
  },
  {
    id: 4,
    pregunta: "¿Cómo puedo rastrear mi pedido?",
    respuesta: "Una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de seguimiento y un enlace directo a la plataforma de la paquetería para que puedas seguir su estado en tiempo real."
  }
];

const FAQ = () => {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  const togglePregunta = (id) => {
    setPreguntaAbierta(preguntaAbierta === id ? null : id);
  };

  return (
    <div className="p-8 mx-auto max-w-3xl font-sans">
      
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10 border-b-2 border-[#8005A5] pb-3">
        Preguntas Frecuentes ❓
      </h1>

      <div className="space-y-4">
        {preguntasFrecuentes.map((item) => (
          <div 
            key={item.id} 
            className="border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <button
              className="w-full text-left p-4 flex justify-between items-center font-semibold text-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
              onClick={() => togglePregunta(item.id)}
              aria-expanded={preguntaAbierta === item.id}
            >
              {item.pregunta}
              <span className={`transform transition-transform duration-300 ${preguntaAbierta === item.id ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>

            {preguntaAbierta === item.id && (
              <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  {item.respuesta}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-lg font-medium text-gray-700">
              ¿No encontraste lo que buscabas? Contáctanos a nuestro chat de soporte.
          </p>
      </div>

    </div>
  );
};

export default FAQ;