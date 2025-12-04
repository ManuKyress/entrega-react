import { useState } from "react";
import FormProducto from "./FormProducto";
import { useProductosContext } from "../context/ProductosContext";
import CirclePlus from "../assets/CirclePlus";
import SquarePen from "../assets/SquarePen";
import TrashIcon from "../assets/TrashIcon";

const GestionProductos = () => {
  const { productos, eliminarProducto } = useProductosContext();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null);
    setMostrarForm(true);
  };

  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto);
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  const confirmarEliminacion = (producto) => {
    setProductoAEliminar(producto);
  };

  const handleEliminar = () => {
    if (productoAEliminar) {
      eliminarProducto(productoAEliminar.id);
      setProductoAEliminar(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 border-b border-gray-200 pb-4">
        <h2 className="text-4xl font-extrabold text-[#8005A5]">Administrar Productos</h2>
        <button
          onClick={abrirFormularioAgregar}
          className="flex items-center justify-center gap-2 bg-[#8005A5] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-purple-900 transition-colors duration-200"
        >
          <CirclePlus className="w-5 h-5" />
          <span>Agregar Nuevo Producto</span>
        </button>
      </div>
      
      {productos.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-lg">
          <p className="text-gray-600 text-xl font-medium">No hay productos cargados. ¡Comenzá a agregarlos!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-shrink-0 w-full sm:w-32">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="w-full h-24 object-cover rounded-lg shadow-sm"
                  />
                </div>

                <div className="grow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                  
                  <div className="flex flex-col grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {producto.nombre}
                    </h3>
                    <p className="text-xl font-extrabold text-[#8005A5]">
                      ${producto.precio?.toLocaleString('es-AR')}
                    </p>
                  </div>

                  <div className="flex gap-3 sm:shrink-0">
                    <button
                      onClick={() => abrirFormularioEditar(producto)}
                      className="flex items-center justify-center gap-2 bg-[#8005A5] text-white px-4 py-2 rounded-full font-medium hover:bg-purple-900 transition-colors duration-200 shadow-md"
                    >
                      <SquarePen className="w-4 h-4" />
                      <span className="text-sm">Editar</span>
                    </button>
                    <button
                      onClick={() => confirmarEliminacion(producto)}
                      className="flex items-center justify-center bg-red-50 text-red-600 px-3 py-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                    >
                      <TrashIcon className="w-5 h-5" />
                      <span className="text-sm hidden sm:inline">Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {productoAEliminar && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl transform scale-100 transition-transform duration-300">
            
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Confirmar Eliminación</h3>
                <p className="text-sm text-gray-500 mt-1">Esta acción no se puede deshacer.</p>
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-700">
                ¿Estás SEGURO que querés eliminar el producto <span className="font-extrabold text-red-600">"{productoAEliminar.nombre}"</span>?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setProductoAEliminar(null)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarForm && (
        <div className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <FormProducto
            productoInicial={productoSeleccionado || {}}
            modo={modoFormulario}
            onCerrar={cerrarFormulario}
          />
        </div>
      )}
    </div>
  );
};

export default GestionProductos;

