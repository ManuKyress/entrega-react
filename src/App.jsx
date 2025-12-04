import Header from './components/Header';
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Carrito from './components/Carrito';
import { Routes, Route } from 'react-router-dom';
import ProductoDetalle from './pages/ProductoDetalle';
import Footer from './components/Footer';
import FAQ from './pages/Faqs';
import Login from './pages/Login';
import Admin from './pages/Admin';
import RutaProtegida from "./components/RutaProtegida";
import ResultadosBusqueda from "./components/ResultadosBusqueda";


function App() {

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header/>
      <Routes> 
        <Route path='/' element={<Inicio />}/> 
        <Route path='/Nosotros' element={<Nosotros />}/> 
        <Route path='/Faqs' element={<FAQ />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/busqueda" element={<ResultadosBusqueda />} />
        <Route path='/productos/:id' element={<ProductoDetalle />}/>
        <Route path='/carrito' element={<RutaProtegida ><Carrito /></RutaProtegida>}/>
        <Route path="/admin" element={<RutaProtegida ><Admin /></RutaProtegida>}/>
      </Routes> 
      <Footer/>     
    </div>
  )
}

export default App