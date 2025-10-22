document.addEventListener("DOMContentLoaded", () => {
  // Seções
  const home = document.getElementById("home");
  const gallery = document.getElementById("gallery");
  const about = document.getElementById("about");

  // Delegação de eventos para o menu
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("#link-home")) {
      home.classList.remove("hidden");
      gallery.classList.add("hidden");
      about.classList.add("hidden");
    } 
    else if (e.target.matches("#link-gallery")) {
      home.classList.add("hidden");
      gallery.classList.remove("hidden");
      about.classList.add("hidden");
    } 
    else if (e.target.matches("#link-about")) {
      home.classList.add("hidden");
      gallery.classList.add("hidden");
      about.classList.remove("hidden");
    }
  });

  // Canvas Matrix
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const chars = "アカサタナハマヤラワ0123456789";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
        drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 35);

  // Player
  const playBtn = document.querySelector(".play");
  const audio = new Audio(
    "https://files.catbox.moe/0nuf9m.mp3"
  );
  let playing = false;

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playBtn.textContent = "⏸";
      playing = true;
    } else {
      audio.pause();
      playBtn.textContent = "▶";
      playing = false;
    }
  });
});
