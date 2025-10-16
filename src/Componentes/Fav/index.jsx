import React from "react";
import { filmImages } from "../Utils/helpers";

const Fav = ({ favoritos, onSelect }) => (
  <div>
    <h2>Favoritos</h2>
    <ul>
      {favoritos.map((film) => {
        const episodeId = String(film.properties.episode_id);
        // Usar solo imágenes de Wikipedia o el placeholder de Wikipedia
        const imgSrc =
          filmImages[episodeId] ||
          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        return (
          <li
            key={film.uid}
            onClick={() => onSelect(film.uid)}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <img
              src={imgSrc}
              alt={film.properties.title}
              style={{
                width: "50px",
                height: "75px",
                objectFit: "cover",
                marginRight: "1em",
                borderRadius: "6px",
                boxShadow: "0 0 8px #ffe81f44",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
              }}
            />
            <span
              style={{
                fontWeight: "bold",
                color: "#ffe81f",
                textShadow: "0 0 8px #ffe81f",
              }}
            >
              {film.properties.title}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

export default Fav;