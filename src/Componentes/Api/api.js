fetch('https://swapi.dev/api/people/1/')
  .then(response => response.json())
  .then(data => {
    console.log(data.name); // "Luke Skywalker"
    console.log(data.films); // Array de URLs de películas
  })
  .catch(error => console.error('Error al obtener datos:', error));
