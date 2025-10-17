import React, { useEffect, useState } from "react";
import { filmImages } from "../Utils/helpers";

const DetalleElemento = ({ filmId, onAddFav }) => {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    if (filmId) {
      fetch(`https://www.swapi.tech/api/films/${filmId}`)
        .then((res) => res.json())
        .then((data) => setFilm(data.result))
        .catch(() => setFilm(null));
    }
  }, [filmId]);

  if (!film) return <div>Selecciona una película</div>;

  // Asegura que episodeId sea string y válida
  const episodeId = String(film.properties.episode_id);
  const imgSrc =
    filmImages[episodeId] && ["1", "2", "3", "4", "5", "6"].includes(episodeId)
      ? filmImages[episodeId]
      : "https://starwars-visualguide.com/assets/img/placeholder.jpg";

  return (
    <div>
      <h2>{film.properties.title || "Sin título"}</h2>
      <img
        src={imgSrc}
        alt={film.properties.title}
        style={{
          width: "300px",
          borderRadius: "12px",
          boxShadow: "0 0 24px #ffe81f88",
          marginBottom: "1rem",
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }}
      />
      <p>{film.properties.opening_crawl || "Sin sinopsis"}</p>
      <p>Director: {film.properties.director || "Desconocido"}</p>
      <p>Productor: {film.properties.producer || "Desconocido"}</p>
      <p>Fecha de estreno: {film.properties.release_date || "Desconocida"}</p>
      <button style={{marginBottom: "100px"}} onClick={() => onAddFav(film)}>Añadir a Favoritos ⭐</button>
    </div>
  );
};

export default DetalleElemento;