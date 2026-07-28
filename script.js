const WHATSAPP_NUMBER = "5512992141645";

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");
const menuLinks = document.querySelectorAll(".nav a");
const productButtons = document.querySelectorAll("[data-product]");
const yearElement = document.querySelector("#current-year");

function closeMenu() {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMenu();
    return;
  }

  navigation.classList.add("is-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Fechar menu");
  document.body.classList.add("menu-open");
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

productButtons.forEach((button) => {
  const productName = button.dataset.product;
  const message = `Olá! Tenho interesse no brinquedo ${productName}. Pode me passar mais informações?`;
  button.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
});

yearElement.textContent = new Date().getFullYear();

window.addEventListener("resize", () => {
  if (window.innerWidth >= 820) {
    closeMenu();
  }
});
