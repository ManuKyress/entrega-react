import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import TrashIcon from "../assets/TrashIcon";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad } = useContext(CarritoContext);
  
  const subtotal = carrito.reduce((acc, producto) => {
    const cantidad = producto.cantidad || 1;
    return acc + producto.precio * cantidad;
  }, 0);

  const COSTO_ENVIO_ESTANDAR = 15; 
  const LIMITE_ENVIO_GRATIS = 100;

  const envio = subtotal > LIMITE_ENVIO_GRATIS ? 0 : COSTO_ENVIO_ESTANDAR;
  
  const total = subtotal + envio;

  const manejarCantidad = (indice, operacion) => {
    const producto = carrito[indice];
    const cantidadActual = producto.cantidad;
    const cambios = {
      incrementar: 1,
      decrementar: -1,
    };

    const nuevaCantidad = cantidadActual + cambios[operacion];

    if (nuevaCantidad < 1) {
      eliminarDelCarrito(indice);
    } else {
      actualizarCantidad(indice, nuevaCantidad);
    }
  };
  
  if (carrito.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <svg className="mx-auto h-24 w-24 text-[#8005A5] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">¡Agregá productos para comenzar tu compra!</p>
          <a 
            href="/" 
            className="inline-block bg-[#8005A5] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-900 transition-colors duration-200"
          >
            Ir a comprar
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      
      <h1 className="text-4xl font-extrabold text-[#8005A5] mb-10 border-b-2 border-gray-200 pb-3">
        🛒 Carrito de Compras
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {carrito.map((producto, indice) => {
            const cantidad = producto.cantidad || 1;
            const precioTotal = producto.precio * cantidad;
            
            return (
              <div 
                key={indice} 
                className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex shrink-0">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="w-full sm:w-32 sm:h-32 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  
                  <div className="flex grow flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {producto.nombre}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {producto.descripcion || "Producto de alta calidad"}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button 
                            onClick={() => manejarCantidad(indice, 'decrementar')}
                            className="px-3 py-1 text-gray-600 hover:bg-purple-100 hover:text-[#8005A5] transition-colors duration-150 font-semibold rounded-l-lg"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-medium text-gray-900 min-w-[40px] text-center border-x border-gray-200">
                            {cantidad}
                          </span>
                          <button 
                            onClick={() => manejarCantidad(indice, 'incrementar')}
                            className="px-3 py-1 text-gray-600 hover:bg-purple-100 hover:text-[#8005A5] transition-colors duration-150 font-semibold rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#27ae60]"> 
                            ${precioTotal.toLocaleString('es-AR')}
                          </p>
                          {cantidad > 1 && (
                            <p className="text-xs text-gray-500">
                              ${producto.precio.toLocaleString('es-AR')} c/u
                            </p>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => eliminarDelCarrito(indice)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-150"
                          aria-label="Eliminar producto"
                        >
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-xl p-8 sticky top-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toLocaleString('es-AR')}</span>
              </div>
              
              <div className="flex justify-between text-lg text-gray-700">
                <span>Envío</span>
                <span className="font-semibold">
                  {envio === 0 ? (
                    <span className="text-green-600 font-bold">¡Gratis!</span>
                  ) : (
                    `$${envio.toLocaleString('es-AR')}`
                  )}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-5">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-extrabold text-[#8005A5]">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              className="w-full bg-[#8005A5] text-white py-3 px-4 rounded-full text-lg font-bold shadow-xl transition-all duration-300 hover:bg-purple-900 hover:scale-[1.01]"
            >
              Pagar
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
