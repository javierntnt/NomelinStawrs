import React from "react";

// Mock de películas, reemplaza por tus datos reales si tienes
const peliculasMock = [
  { id: 1, titulo: "A New Hope", imagen: "https://starwars-visualguide.com/assets/img/films/1.jpg" },
  { id: 2, titulo: "The Empire Strikes Back", imagen: "https://starwars-visualguide.com/assets/img/films/2.jpg" },
  { id: 3, titulo: "Return of the Jedi", imagen: "" },
  { id: 4, titulo: "The Phantom Menace", imagen: "" },
  { id: 5, titulo: "Attack of the Clones", imagen: "" },
  { id: 6, titulo: "Revenge of the Sith", imagen: "" },
];

function ListaElementos({ onSelect }) {
  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {peliculasMock.map((pelicula) => (
          <li
            key={pelicula.id}
            style={{ display: "flex", alignItems: "center", marginBottom: "2rem", cursor: "pointer" }}
            onClick={() => onSelect(pelicula.id)}
          >
            <img
              src={pelicula.imagen || "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"}
              alt={pelicula.titulo}
              style={{
                width: "90px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
                marginRight: "1.5rem",
                border: "2px solid #ffe066",
                background: "#222"
              }}
              onError={e => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"; }}
            />
            <span style={{
              color: "#ffe066",
              fontWeight: "bold",
              fontSize: "1.5rem",
              textShadow: "0 0 10px #ffe066"
            }}>
              {pelicula.titulo}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaElementos;