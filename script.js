const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

async function searchButtonClickHandler() {
  try {
    overlay.classList.add("open-overlay");

    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data: ", data);
    console.log("response: ", response);
  } catch (error) {
    console.error(error.message);
  }
}

function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("O ano do filme estar inválido");
  }
  return `&y=${movieYear.value}`;
}

searchButton.addEventListener("click", searchButtonClickHandler);
