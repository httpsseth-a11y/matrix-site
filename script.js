// MATRIX BACKGROUND
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  const chars = "アァカサタナハマヤャラワン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 14;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
});

// MENU
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section");

  function showSection(id) {
    sections.forEach(sec => sec.classList.add("hidden"));
    const target = document.querySelector(id);
    if (target) target.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href");
      showSection(id);
    });
  });

  showSection("#home");
});

// PLAYER
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".play");
  const audio = document.getElementById("audio");
  if (!button || !audio) return;

  button.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      button.textContent = "❚❚";
    } else {
      audio.pause();
      button.textContent = "▶";
    }
  });
});

// MODAL DE IMAGEM
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close");
  const imgs = document.querySelectorAll(".gallery img");
  const sections = document.querySelectorAll("section");

  imgs.forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modalImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    // Volta para Home automaticamente
    sections.forEach(sec => sec.classList.add("hidden"));
    document.querySelector("#home").classList.remove("hidden");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      sections.forEach(sec => sec.classList.add("hidden"));
      document.querySelector("#home").classList.remove("hidden");
    }
  });
});
