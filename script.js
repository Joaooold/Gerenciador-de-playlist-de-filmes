const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const movieListConteiner = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];
async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data: ", data);

    createModal(data);
    overlay.classList.add("open-overlay");
    if (data.Error) {
      throw new Error("O filme não foi encontrado");
    }
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (movieYear.value === "") {
    return "";
  }
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("O ano do filme estar inválido");
  }
  return `&y=${movieYear.value}`;
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function isMovieAlreadyOnList(id) {
  function DoesThisIdBelongToTheMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(DoesThisIdBelongToTheMovie));
}

function updateUI(movieObject) {
  movieListConteiner.innerHTML += `
      <article id="movie-card-${movieObject.imdbID}">
        <img src="${movieObject.Poster}" alt="Poster do filme ${movieObject.Title}">
        <button class="remove-button" onclick="{removeMovieFromList('${movieObject.imdbID}')}"><i class="bi bi-trash"></i> Remover</button>
      </article>`;
}

function removeMovieFromList(id) {
  notie.confirm({
    text: "Deseja remover o filme da lista?",
    submitText: "Sim",
    cancelText: "Não",
    positiom: "top",
    submitCallback: function removeMovie() {
      movieList = movieList.filter((movie) => movie.imdbID !== id);
      document.getElementById(`movie-card-${id}`).remove();
      updateLocalStorage();
    },
  });
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUI(movieInfo);
}

searchButton.addEventListener("click", searchButtonClickHandler);
