// MATRIX RAIN
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const chars = "01@#$%&*+-/\\";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff90';
  ctx.font = fontSize + 'px monospace';
  drops.forEach((y, i) => {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
  requestAnimationFrame(draw);
}
draw();

// MENU SWITCH
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hide'));
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.classList.remove('hide');
  });
});

// GALLERY MODAL (Xat-safe)
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => window.open(img.src, '_blank'));
});

// PLAYER
const playBtn = document.getElementById('play');
const music = document.getElementById('music');
let playing = false;
playBtn.addEventListener('click', () => {
  playing = !playing;
  if (playing) { music.play(); playBtn.textContent = '❚❚'; }
  else { music.pause(); playBtn.textContent = '▶'; }
});
