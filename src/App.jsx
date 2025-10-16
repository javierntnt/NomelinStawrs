import React, { useState } from "react";
import Navegacion from "./Componentes/Navegacion/idex";
import ListaElementos from "./Componentes/listaElementos/index";
import DetalleElemento from "./Componentes/Detalleselemento/index";
import Fav from "./Componentes/Fav/index";
import Informatica from "./Componentes/Informatica/index";
import Home from "./Componentes/Home/index";
import Pestañaoriginal from "./Componentes/Pestañaoriginal/index";
import './App.css'

function App() {
  const [vista, setVista] = useState("lista");
  const [filmId, setFilmId] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  const handleSelect = (id) => {
    setFilmId(id);
    setVista("detalle");
  };

  const handleAddFav = (film) => {
    setFavoritos((prev) => [...prev, film]);
  };

  return (
    <div>
      <Navegacion setVista={setVista} />
      {vista === "home" && (
        <Home />
      )}
      {vista === "lista" && (
        <ListaElementos onSelect={handleSelect} />
      )}
      {vista === "detalle" && (
        <DetalleElemento filmId={filmId} onAddFav={handleAddFav} />
      )}
      {vista === "fav" && (
        <Fav favoritos={favoritos} onSelect={handleSelect} />
      )}
      {vista === "info" && <Informatica />}
       {vista === "original" && <Pestañaoriginal />} 
    </div>
  );
}

export default App;
