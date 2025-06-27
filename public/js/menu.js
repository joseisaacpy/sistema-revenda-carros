export function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}

export function initMenuToggle() {
  const menuButton = document.getElementById("menu-button");
  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }
}

initMenuToggle();
