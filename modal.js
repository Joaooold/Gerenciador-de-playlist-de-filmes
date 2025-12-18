const background = document.getElementById("modal-background");

function backgroundClickHandler() {
  overlay.classList.remove("open-overlay");
}
background.addEventListener("click", backgroundClickHandler);
