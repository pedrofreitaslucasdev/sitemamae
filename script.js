const WHATSAPP_NUMBER = "5512992141645";

/* ---------- menu ---------- */
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");
const menuLinks = document.querySelectorAll(".nav a");

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

window.addEventListener("resize", () => {
  if (window.innerWidth >= 820) {
    closeMenu();
  }
});

/* ---------- botão "Quero!" ----------
   Monta o link do zap com o nome do brinquedinho já escrito.
   "Quero" é a palavra da live — é assim que elas fecham compra.
   Escrito como "Quero esse aqui: X" pra servir tanto pra boneca
   quanto pra carrinho, sem errar o o/a. */
document.querySelectorAll("[data-produto]").forEach((button) => {
  const nome = button.dataset.produto;
  const mensagem = `Oi amiga! Quero esse aqui: ${nome}. Ainda tem?`;
  button.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
});

/* ---------- foto que ainda não existe ----------
   Em vez de mostrar ícone de imagem quebrada, marca o card
   com "falta a foto" — assim fica fácil ver o que falta subir. */
document.querySelectorAll(".product-card__image img").forEach((img) => {
  const marcar = () => img.parentElement.classList.add("sem-foto");
  img.addEventListener("error", marcar);
  if (img.complete && img.naturalWidth === 0) {
    marcar();
  }
});

/* ---------- filtros ---------- */
const filtros = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll("#grade .product-card");
const gradeVazio = document.querySelector("#grade-vazio");

filtros.forEach((filtro) => {
  filtro.addEventListener("click", () => {
    const alvo = filtro.dataset.filtro;

    filtros.forEach((f) => f.classList.toggle("is-active", f === filtro));

    let visiveis = 0;
    cards.forEach((card) => {
      const mostra = alvo === "todos" || card.dataset.tipo === alvo;
      card.hidden = !mostra;
      if (mostra) visiveis += 1;
    });

    gradeVazio.hidden = visiveis > 0;
  });
});

/* ---------- copiar o link do brinquedinho ----------
   As clientes repassam pra amiga no zap e no grupo.
   Cada brinquedinho tem link próprio que abre já nele. */
const toast = document.querySelector("#toast");
let toastTimer;

function mostrarToast(mensagem) {
  toast.textContent = mensagem;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

document.querySelectorAll(".link-peca").forEach((botao) => {
  botao.addEventListener("click", async () => {
    const url = `${location.origin}${location.pathname}#${botao.dataset.link}`;

    try {
      await navigator.clipboard.writeText(url);
      mostrarToast("Link copiado 💛");
    } catch {
      // navegador antigo ou sem permissão: mostra o link pra copiar na mão
      mostrarToast(url);
    }
  });
});

/* ---------- próxima live ----------
   Quinta-feira às 19:30. Calculado na hora pra nunca ficar
   desatualizado se ninguém mexer no site. */
const aviso = document.querySelector("#proxima-live");

if (aviso) {
  const QUINTA = 4;
  const HORA = 19;
  const MINUTO = 30;

  const agora = new Date();
  const proxima = new Date(agora);
  proxima.setHours(HORA, MINUTO, 0, 0);

  let faltam = (QUINTA - agora.getDay() + 7) % 7;
  if (faltam === 0 && agora > proxima) {
    faltam = 7;
  }
  proxima.setDate(proxima.getDate() + faltam);

  const dia = proxima.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

  if (faltam === 0) {
    aviso.textContent = "É hoje!";
  } else if (faltam === 1) {
    aviso.textContent = "É amanhã.";
  } else {
    aviso.textContent = `Próxima: ${dia}.`;
  }
}

/* ---------- ano do rodapé ---------- */
document.querySelector("#current-year").textContent = new Date().getFullYear();
