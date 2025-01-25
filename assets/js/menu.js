document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu");
  const menuContent = document.querySelector(".menu-open");

  menuButton.addEventListener("click", (e) => {
    e.preventDefault();
    menuContent.classList.toggle("is-active");
  });
});
