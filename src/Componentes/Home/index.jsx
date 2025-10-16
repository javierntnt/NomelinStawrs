import React, { useState, useEffect } from "react";
import { filmImages } from "../Utils/helpers";

function Home({ onSelect }) {
  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => {
        const peliculasConImagen = data.results.map((pelicula) => {
          const id = pelicula.url.match(/\/api\/films\/(\d+)\//)?.[1];
          return {
            id,
            titulo: pelicula.title,
            imagen: filmImages[id] || "", // Usa el helper para la imagen
          };
        });
        setPeliculas(peliculasConImagen);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const peliculasFiltradas = peliculas.filter((pelicula) =>
    pelicula.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ color: "#ffe066", textShadow: "0 0 10px #ffe066" }}>Películas</h1>
      <input
        type="text"
        placeholder="Buscar película..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          marginBottom: "2rem",
          padding: "0.7rem 1rem",
          width: "350px",
          fontSize: "1.2rem",
          background: "#111",
          color: "#ffe066",
          border: "3px solid #ffe066",
          borderRadius: "10px",
          boxShadow: "0 0 10px #ffe066",
          outline: "none"
        }}
      />
      {cargando ? (
        <p style={{ color: "#ffe066" }}>Cargando...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {peliculasFiltradas.length > 0 ? (
            peliculasFiltradas.map((pelicula) => (
              <li
                key={pelicula.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "2rem",
                  cursor: "pointer"
                }}
                onClick={() => onSelect && onSelect(pelicula.id)}
              >
                <img
                  src={pelicula.imagen}
                  alt={pelicula.titulo}
                  style={{
                    width: "110px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginRight: "1.5rem",
                    border: "3px solid #ffe066",
                    background: "#222",
                    boxShadow: "0 0 10px #ffe066"
                  }}
                  onError={e => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"; }}
                />
                <span style={{
                  color: "#ffe066",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  textShadow: "0 0 10px #ffe066"
                }}>
                  {pelicula.titulo}
                </span>
              </li>
            ))
          ) : (
            <li style={{ color: "#ffe066", marginLeft: "2rem" }}>No se encontraron películas.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Home;