var btn = document.querySelector("#login");
var modal = document.querySelector("#myModal");
var close = document.querySelector("#close");
btn.addEventListener("click", () => {
  modal.style.display = "block";
});
close.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
