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
      <header className="flex justify-between items-center px-10 border-b border-gray-200 relative z-50 py-3">
        <button 
          className="md:hidden flex flex-col justify-between w-6 h-5 z-100"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span className="w-full bg-black h-0.5 rounded transition-all duration-300"></span>
          <span className="w-full bg-black h-0.5 rounded transition-all duration-300"></span>
          <span className="w-full bg-black h-0.5 rounded transition-all duration-300"></span>
        </button>

        <div className="xl:text-[40px] sm:text-[30px] text-[30px] font-bold text-[#333] font-['Pirata_One']">
          <Link to="/">
            GHOST
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
                  className="hidden md:inline text-sm font-medium text-[#333] hover:underline transition-all duration-200 cursor-pointer"
                >
                  Hola, {usuario.nombre}
                </Link>
              ) : (
                <span className="hidden md:inline text-sm font-medium text-[#333]">
                  Hola, {usuario.nombre}
                </span>
              )}
              
              <button 
                onClick={logout} 
                className="hidden md:flex justify-center rounded-md border border-white bg-black px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#333] transition-colors duration-200"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="hidden md:block">
              <button className="flex justify-center rounded-md border border-white bg-black px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#333] transition-colors duration-200">
                Ingresá
              </button>
            </Link>
          )}
          
          <div className="relative">
            <Link to="/carrito">
              <BagIcon className="w-6 h-6" />
              {contadorEnCarrito > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {contadorEnCarrito}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div 
        className={`fixed top-0 left-0 w-full h-screen bg-black z-100 overflow-y-auto transition-transform duration-300 ease-in-out ${
          menuAbierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button 
          className="absolute top-6 right-6 text-white w-12 h-12 flex items-center justify-center z-[1001] hover:opacity-70 transition-opacity"
          onClick={cerrarMenu}
          aria-label="Cerrar menú"
        >
          <X />
        </button>
        
        <div className="px-8 py-16 flex flex-col gap-12 min-h-screen">
          <div className="text-5xl font-['Pirata_One'] text-white text-center mb-4">
            Ghost
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
                    className="text-white text-xl font-medium text-center mb-2 hover:underline transition-all duration-200"
                  >
                    Hola, {usuario.nombre}
                  </Link>
                ) : (
                  <span className="text-white text-xl font-medium text-center mb-2">
                    Hola, {usuario.nombre}
                  </span>
                )}
                
                <button 
                  onClick={() => {
                    logout();
                    cerrarMenu();
                  }} 
                  className="w-full rounded-md bg-black px-4 py-3 text-base font-semibold text-white hover:bg-white hover:text-black transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" onClick={cerrarMenu} className="w-full">
                <button className="w-full rounded-md bg-black px-4 py-3 text-base font-semibold text-white hover:bg-white hover:text-black transition-colors duration-200">
                  Ingresá
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuAbierto && (
        <div 
          className="fixed top-0 left-0 w-full h-screen bg-black/50 z-99"
          onClick={cerrarMenu}
        ></div>
      )}
    </>
  );
};

export default Header;