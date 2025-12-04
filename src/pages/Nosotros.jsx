const Nosotros = () => {
  return (
    <div className="p-8 mx-auto max-w-4xl font-sans text-gray-700">
      
      <h1 className="text-center text-5xl font-extrabold text-[#8005A5] mb-6">
        Nuestra Historia y Misión 🌟
      </h1>

      <p className="text-center text-xl text-gray-600 mb-12">
        En Ghost Store, creemos que cada producto cuenta una historia. 
        Nuestra misión es ofrecer calidad, innovación y pasión en cada artículo que seleccionamos.
      </p>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        
        <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Calidad Garantizada</h3>
          <p className="text-gray-600">
            Cada producto pasa por un riguroso control de calidad. Solo lo mejor llega a tus manos.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Pasión por el Detalle</h3>
          <p className="text-gray-600">
            Somos un equipo impulsado por la pasión de traer al mercado productos únicos e innovadores.
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Comunidad y Servicio</h3>
          <p className="text-gray-600">
            Nuestros clientes son el centro de todo. Estamos aquí para ayudarte a encontrar exactamente lo que necesitas.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center p-6 bg-purple-50 rounded-lg">
          <p className="text-xl font-semibold text-gray-700">
              ¡Gracias por formar parte de nuestra comunidad!
          </p>
      </div>

    </div>
  );
}

export default Nosotros;