// LOGIN MODAL

var btn = document.querySelector("#login");
var modal = document.querySelector("#myModal");
var close = document.querySelector("#close");
btn.addEventListener("click", () => {
  modal.style.display = "block";
});
close.onclick = () => {
  modal.style.display = "none";
};
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
