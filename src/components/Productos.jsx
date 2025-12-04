import { Link } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";
import { useState } from "react";

const Productos = () => {
  const { productos, cargando, error } = useProductosContext();

  const productosPorPagina = 8;
  const [paginaActual, setPaginaActual] = useState(1);

  if (cargando) return <div className="text-center p-12 text-2xl font-semibold text-[#8005A5]">Cargando productos...</div>;
  if (error) return <div className="text-center p-12 text-2xl font-semibold text-red-500">Error al cargar: {error}</div>;

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


  return (
    <div className="p-8 font-sans mx-auto max-w-7xl">

      <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-12 border-b-2 border-[#8005A5] pb-3">
        Descubre Nuestros Productos
      </h2>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {productosActuales.map((producto) => (
          <div
            key={producto.id}
            className="relative group bg-white border border-gray-100 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
          >
            <div className="w-full h-56 bg-white flex items-center justify-center p-4">
              <img
                alt={producto.nombre}
                src={producto.imagen}
                className="w-auto h-full object-contain transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4 pt-2 flex flex-col items-start w-full">
              <h3 className="text-lg font-bold text-gray-900 leading-tight h-10 overflow-hidden mb-1">
                <Link to={`/productos/${producto.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" /> 
                  {producto.nombre}
                </Link>
              </h3>
              <p className="text-2xl font-extrabold text-[#27ae60] mb-4">
                ${producto.precio}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 my-16">
        {Array.from({ length: totalPaginas }, (_, indice) => (
          <button
            key={indice + 1}
            className={`px-4 py-2 rounded-full font-bold transition duration-300 ${
              paginaActual === indice + 1
                ? "bg-[#8005A5] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => cambiarPagina(indice + 1)}
          >
            {indice + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Productos;