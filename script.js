const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

async function searchButtonClickHandler() {
  const movieNameUrl = movieName.value.split(" ").join("+");
  const movieYearUrl = movieYear.value;

  let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameUrl}&y=${movieYearUrl}`;
  const response = await fetch(url);
  
  // Verifica se a resposta foi bem sucedida
  if (!response.ok) {
    console.error('Erro na requisição:', response.status);
    return;
  }

  const data = await response.json();
  console.log("data: ", data);
  overlay.classList.add("open-overlay");
}

searchButton.addEventListener("click", searchButtonClickHandler);
