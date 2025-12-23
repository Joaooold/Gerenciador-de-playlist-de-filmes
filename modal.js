const background = document.getElementById("modal-background");
const modalConteiner = document.getElementById("modal-conteiner");

let currentMovie = {};

function backgroundClickHandler() {
  overlay.classList.remove("open-overlay");
}

function closeModal() {
  overlay.classList.remove("open-overlay");
}

function addCurrentMovieToList() {
  if (isMovieAlreadyOnList(currentMovie.imdbID)) {
    notie.alert({ type: "error", text: "Este filme ja estar na lista!" })
    closeModal();
    return;
  }
  addToList(currentMovie);
  updateUI(currentMovie);
  closeModal();
}
function createModal(data) {
  currentMovie = data;
  modalConteiner.innerHTML = `
  <h2 id="movie-title">${data.Title} - ${data.Year}</h2>
          <section id="modal-body">
            <img
              id="movie-poster"
              src=${data.Poster}
              alt="poster do filme"
            />
            <div id="movie-info">
              <h3 id="movie-plot">
                ${data.Plot}
              </h3>
              <div id="movie-cast">
                <h4>Elenco:</h4>
                <h5>${data.Actors}</h5>
              </div>
              <div id="movie-genre">
                <h4>Gênero:</h4>
                <h5>${data.Genre}</h5>
              </div> 
            </div>
          </section>
          <section id="movie-footer">
            <button id="add-to-list" onclick="{addCurrentMovieToList()}">Adicionar a lista</button>
          </section>
  `;
}
background.addEventListener("click", backgroundClickHandler);
