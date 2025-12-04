import { useState, useEffect, createContext, useContext } from 'react';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const API = "https://68ec1ed5eff9ad3b140158ee.mockapi.io/productos";
  
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      
      const respuesta = await fetch(API);
      
      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);
      
      const datos = await respuesta.json();
      setProductos(datos);

    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError(error.message || "Error al cargar los productos");

    } finally {
      setCargando(false);
    }
  };

  const agregarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      const nuevoProducto = await respuesta.json();
      console.log("Producto agregado: ", nuevoProducto);
      
      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);

      setProductos([...productos, nuevoProducto]);

    } catch (error) {
      console.error("Error al agregar:", error);
      const mensajeError = "Hubo un problema al agregar el producto.";
      setError(mensajeError);
    }
  };

  const editarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(`${API}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);

      const productoActualizado = await respuesta.json();
      setProductos(productos.map(p => 
        p.id === productoActualizado.id ? productoActualizado : p
      ));

    } catch (error) {
      console.error("Error al editar:", error);
      const mensajeError = "Hubo un problema al editar el producto.";
      setError(mensajeError);
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");

    if (confirmar) {
      try {
        setError(null);

        const respuesta = await fetch(`${API}/${id}`, {
            method: "DELETE",
          }
        );

        if (!respuesta.ok) 
          throw new Error("Error al eliminar");  

        setProductos(productos.filter(p => p.id !== id));
      } 
      catch (error) {
      console.error(error.message);
      const mensajeError = "Hubo un problema al eliminar el producto.";
      setError(mensajeError);
      }
    }
  };

  return (
    <ProductosContext.Provider value={{ 
      productos,
      cargando,
      error, 
      cargarProductos, 
      agregarProducto, 
      editarProducto, 
      eliminarProducto 
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductosContext = () => useContext(ProductosContext);