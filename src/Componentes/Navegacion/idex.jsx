import React from "react";

const Navegacion = ({ setVista }) => (
  <nav>
    <button onClick={() => setVista("lista")}>Películas</button>
    <button onClick={() => setVista("fav")}>Favoritos</button>
    <button onClick={() => setVista("info")}>Informativa</button>
    <button onClick={() => setVista("home")}>Home</button>
    <button onClick={() => setVista("original")}>original</button>

  </nav>
);

export default Navegacion;