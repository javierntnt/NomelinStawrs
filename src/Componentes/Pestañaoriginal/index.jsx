import React, { useState, useEffect } from "react";

// 🎯 Categorías disponibles
const categories = ["Jedi", "Sith", "Droid", "Human"];

// 🙌 Personajes predefinidos por categoría
const categoryMap = {
  Jedi: ["Luke Skywalker", "Obi-Wan Kenobi", "Yoda", "Mace Windu", "Qui-Gon Jinn"],
  Sith: ["Darth Vader", "Darth Maul", "Emperor Palpatine", "Count Dooku"],
  Droid: ["C-3PO", "R2-D2", "IG-88", "BB8"],
  Human: [] // humanos serán inferidos si species está vacío
};

export default function Original() {
  const [step, setStep] = useState("select"); // 'select' | 'play'
  const [category, setCategory] = useState("");
  const [characters, setCharacters] = useState([]);
  const [current, setCurrent] = useState(null);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Cargar personajes cuando se selecciona categoría
  useEffect(() => {
    if (category) {
      setLoading(true);
      fetch("https://swapi.dev/api/people/")
        .then((res) => res.json())
        .then((data) => {
          const all = data.results;

          let filtered = [];
          if (category === "Human") {
            filtered = all.filter((char) => char.species.length === 0);
          } else {
            const names = categoryMap[category];
            filtered = all.filter((char) => names.includes(char.name));
          }

          if (filtered.length > 0) {
            setCharacters(filtered);
            setCurrent(filtered[Math.floor(Math.random() * filtered.length)]);
            setStep("play");
          } else {
            alert("No hay personajes disponibles en esta categoría.");
            setStep("select");
          }
        })
        .catch((err) => {
          console.error("Error al obtener personajes:", err);
          alert("Error al cargar personajes.");
        })
        .finally(() => setLoading(false));
    }
  }, [category]);

  const handleGuess = () => {
    if (!current) return;
    if (guess.trim().toLowerCase() === current.name.toLowerCase()) {
      setFeedback("✅ ¡Correcto!");
      setTimeout(() => {
        const next = characters[Math.floor(Math.random() * characters.length)];
        setCurrent(next);
        setGuess("");
        setFeedback("");
      }, 1500);
    } else {
      setFeedback("❌ Intenta de nuevo");
    }
  };

  const resetGame = () => {
    setStep("select");
    setCategory("");
    setCharacters([]);
    setCurrent(null);
    setGuess("");
    setFeedback("");
  };

  return (
    <div style={{ background: "#000", color: "#ffe066", minHeight: "100vh", padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1 style={{ textShadow: "0 0 10px #ffe066" }}>🌌 Desafío Galáctico</h1>

      {step === "select" && (
        <>
          <h2>Elige una categoría</h2>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                margin: "10px",
                padding: "1rem 2rem",
                fontSize: "1.2rem",
                background: "#111",
                color: "#ffe066",
                border: "2px solid #ffe066",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 0 8px #ffe066"
              }}
            >
              {cat}
            </button>
          ))}
        </>
      )}

      {loading && <p>Cargando personajes...</p>}

      {step === "play" && current && (
        <>
          <h2>Categoría: {category}</h2>
          <div style={{ marginTop: "1.5rem" }}>
            <p>🌟 <strong>Altura:</strong> {current.height} cm</p>
            <p>👀 <strong>Color de ojos:</strong> {current.eye_color}</p>
            <p>🎬 <strong>Número de apariciones:</strong> {current.films.length}</p>

            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Adivina el nombre del personaje"
              style={{
                padding: "0.6rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "2px solid #ffe066",
                width: "60%",
                marginTop: "1rem",
                background: "#111",
                color: "#ffe066"
              }}
            />
            <br />
            <button
              onClick={handleGuess}
              style={{
                marginTop: "1rem",
                padding: "0.6rem 1.5rem",
                fontSize: "1rem",
                background: "#111",
                color: "#ffe066",
                border: "2px solid #ffe066",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Adivinar
            </button>

            {feedback && (
              <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{feedback}</p>
            )}

            <button
              onClick={resetGame}
              style={{
                marginTop: "2rem",
                padding: "0.4rem 1rem",
                background: "transparent",
                color: "#ffe066",
                border: "1px solid #ffe066",
                borderRadius: "6px",
                fontSize: "0.9rem",
                cursor: "pointer"
              }}
            >
              🔁 Cambiar categoría
            </button>
          </div>
        </>
      )}
    </div>
  );
}
