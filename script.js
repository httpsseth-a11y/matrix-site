// Fundo matrix
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "アァカサタナハマヤラワ0123456789".split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff55";
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 35);

// Navegação
const home = document.getElementById("home");
const gallery = document.getElementById("gallery");
const about = document.getElementById("about");

document.getElementById("link-home").addEventListener("click", () => {
  home.classList.remove("hidden");
  gallery.classList.add("hidden");
  about.classList.add("hidden");
});
document.getElementById("link-gallery").addEventListener("click", () => {
  home.classList.add("hidden");
  gallery.classList.remove("hidden");
  about.classList.add("hidden");
});
document.getElementById("link-about").addEventListener("click", () => {
  home.classList.add("hidden");
  gallery.classList.add("hidden");
  about.classList.remove("hidden");
});

// Modal de imagem
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close");

document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modalImg.src = img.src;
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Player de música
const playBtn = document.getElementById("playBtn");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    playBtn.textContent = "⏸";
  } else {
    bgMusic.pause();
    playBtn.textContent = "▶";
  }
  isPlaying = !isPlaying;
});
