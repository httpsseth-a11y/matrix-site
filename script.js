document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");
  const links = document.querySelectorAll(".nav-center a"); // <-- aqui está o segredo!
  const modal = document.querySelector("#modal");
  const modalImg = document.querySelector("#modal-img");
  const closeModal = document.querySelector(".modal .close");
  const galleryClose = document.querySelector(".close-gallery");
  const aboutClose = document.querySelector(".close-about");

  // Navegação entre seções
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("href").replace("#", "");
      sections.forEach(sec => sec.classList.add("hidden"));
      document.querySelector(`#${target}`).classList.remove("hidden");
    });
  });

  // Abrir imagem no modal
  document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.classList.remove("hidden");
    });
  });

  // Fechar modal de imagem
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Fechar galeria e voltar para Home
  galleryClose.addEventListener("click", () => {
    document.querySelector("#gallery").classList.add("hidden");
    document.querySelector("#home").classList.remove("hidden");
  });

  // Fechar About e voltar para Home
  aboutClose.addEventListener("click", () => {
    document.querySelector("#about").classList.add("hidden");
    document.querySelector("#home").classList.remove("hidden");
  });

  // Player simples
  const audio = new Audio(
    "https://www.dropbox.com/scl/fi/f1jjoo8xvhkp2ugoeenb6/Daydreamin-feat.-Jill-Scott-C0rcii5DCms.mp3?rlkey=y2abzaxc9h6tzdaluqalx7he2&dl=1"
  );
  const playBtn = document.querySelector(".play");
  let playing = false;

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playBtn.textContent = "⏸";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
    playing = !playing;
  });

  // Fundo Matrix
  const canvas = document.querySelector("#matrix-canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const chars =
    "アァカサタナハマヤャラワン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 40);
});
