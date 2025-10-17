import React from "react";
import StarWarsLogo from "../../assets/Star_Wars_Logo.png"; // ruta corregida

const Informatica = () => (
  <div style={{ textAlign: "center" }}>
    <h2>Información de la App</h2>
    <img 
      src={StarWarsLogo} 
      alt="Logo Star Wars" 
      style={{
        width: "300px",
        margin: "20px 0",
        filter: "drop-shadow(0 0 10px #ffe81f)"
      }} 
    />
    <p style={{ fontSize: "1.2rem" }}>
      Esta app muestra películas de <strong>Star Wars</strong> usando la API de SWAPI.
    </p>
  </div>
);

export default Informatica;