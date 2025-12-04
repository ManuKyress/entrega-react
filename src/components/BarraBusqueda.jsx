import { useSearch } from "../context/BusquedaContext";
import { useNavigate } from "react-router-dom";

const BarraBusqueda = () => {
  const { busqueda, setBusqueda } = useSearch();
  const navigate = useNavigate();

  const manejarBusqueda = (evento) => {
    const valor = evento.target.value;
    setBusqueda(valor);

    if (valor.trim()) {
      navigate("/busqueda");
    }
  };

  return (
    <form class="max-w-md mx-auto">
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          placeholder="Buscar Productos..."
          value={busqueda}
          onChange={manejarBusqueda}
        />
      </div>
    </form>
  );
};

export default BarraBusqueda;