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

const storySection = document.querySelector("#historia");
const storyLinks = document.querySelectorAll('a[href="#historia"]');
const storyCloseButton = document.querySelector(".story__close");

function setStoryOpen(isOpen) {
  storySection.classList.toggle("is-open", isOpen);
  storyLinks.forEach((link) => link.setAttribute("aria-expanded", String(isOpen)));

  if (isOpen) {
    requestAnimationFrame(() => {
      storySection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

storyLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setStoryOpen(!storySection.classList.contains("is-open"));
  });
});

storyCloseButton.addEventListener("click", () => setStoryOpen(false));

productButtons.forEach((button) => {
  const productName = button.dataset.product;
  const message = `Oi! Vi o ${productName} no site e fiquei interessado(a). Ainda está disponível?`;
  button.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
});

yearElement.textContent = new Date().getFullYear();

window.addEventListener("resize", () => {
  if (window.innerWidth >= 820) {
    closeMenu();
  }
});
