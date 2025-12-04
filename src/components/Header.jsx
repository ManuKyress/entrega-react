import { useContext, useState } from 'react';
import Navbar from './NavBar';
import BagIcon from '../assets/BagIcon';
import X from '../assets/X';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';


const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useAuthContext();
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  const estaLogeado = !!usuario;
  const contadorEnCarrito = carrito.length;
  
  const esAdmin = usuario?.rol === 'admin';

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 md:px-10 bg-white border-b border-gray-100 shadow-md relative z-50 py-3">
        
        <button 
          className="md:hidden flex flex-col justify-between w-6 h-5 relative z-[1001]"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span 
            className={`w-full h-0.5 rounded transition-all duration-300 ${menuAbierto ? 'rotate-45 translate-y-[9px] bg-white' : 'bg-black'}`}
          ></span>
          <span 
            className={`w-full h-0.5 rounded transition-all duration-300 ${menuAbierto ? 'opacity-0' : 'bg-black'}`}
          ></span>
          <span 
            className={`w-full h-0.5 rounded transition-all duration-300 ${menuAbierto ? '-rotate-45 -translate-y-[9px] bg-white' : 'bg-black'}`}
          ></span>
        </button>

        <div className="flex items-center"> 
          <Link to="/" aria-label="Ir a la página de inicio">
            <img 
              src="./Logo.png" 
              alt="GHOST Logo de la Tienda" 
              className="h-8 sm:h-10 w-auto" 
            />
          </Link>
        </div>

        <div className="hidden md:block">
          <Navbar />
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {estaLogeado ? (
            <>
              {esAdmin ? (
                <Link 
                  to="/admin" 
                  className="hidden md:inline text-sm font-medium text-[#8005A5] hover:underline transition-all duration-200 cursor-pointer"
                >
                  Hola, {usuario.nombre}
                </Link>
              ) : (
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  Hola, {usuario.nombre}
                </span>
              )}
              
              <button 
                onClick={logout} 
                className="hidden md:flex justify-center rounded-full border border-[#8005A5] bg-white px-3 py-1.5 text-sm font-semibold text-[#8005A5] hover:bg-purple-50 transition-colors duration-200"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="hidden md:block">
              <button 
                className="flex justify-center rounded-full bg-[#8005A5] px-4 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-purple-900 transition-colors duration-200"
              >
                Ingresá
              </button>
            </Link>
          )}
          
          <div className="relative">
            <Link to="/carrito" aria-label="Ver carrito">
              <BagIcon className="w-6 h-6 text-[#8005A5] hover:opacity-70 transition-opacity" />
              {contadorEnCarrito > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white">
                  {contadorEnCarrito}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div 
        className={`fixed top-0 left-0 w-full h-screen bg-black/95 z-[1000] overflow-y-auto transition-transform duration-300 ease-in-out ${
          menuAbierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button 
          className="absolute top-6 right-6 text-white w-10 h-10 flex items-center justify-center z-[1001] hover:text-[#8005A5] transition-colors"
          onClick={cerrarMenu}
          aria-label="Cerrar menú"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="px-8 py-20 flex flex-col gap-12 min-h-screen">
          
          <div className="text-6xl text-[#8005A5] text-center mb-8 border-b border-gray-700 pb-4">
             <img 
               src="./public/Logo.png" 
               alt="GHOST Logo de la Tienda" 
               className="h-12 w-auto mx-auto" 
             />
          </div>

          <div className="flex flex-col" onClick={cerrarMenu}>
            <Navbar />
          </div>

          <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-gray-700">
            {estaLogeado ? (
              <>
                {esAdmin ? (
                  <Link 
                    to="/admin" 
                    onClick={cerrarMenu}
                    className="text-white text-xl font-bold text-center mb-2 hover:text-[#8005A5] transition-colors duration-200"
                  >
                    Hola, {usuario.nombre}
                  </Link>
                ) : (
                  <span className="text-white text-xl font-bold text-center mb-2">
                    Hola, {usuario.nombre}
                  </span>
                )}
                
                <button 
                  onClick={() => {
                    logout();
                    cerrarMenu();
                  }} 
                  className="w-full rounded-full bg-[#8005A5] px-4 py-3 text-base font-bold text-white shadow-lg hover:bg-purple-900 transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" onClick={cerrarMenu} className="w-full">
                <button 
                  className="w-full rounded-full bg-[#8005A5] px-4 py-3 text-base font-bold text-white shadow-lg hover:bg-purple-900 transition-colors duration-200"
                >
                  Ingresá
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {menuAbierto && (
        <div 
          className="fixed top-0 left-0 w-full h-screen bg-black/30 z-[999]"
          onClick={cerrarMenu}
        ></div>
      )}
    </>
  );
};

export default Header;

