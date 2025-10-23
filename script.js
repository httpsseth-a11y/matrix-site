/* ========== MATRIX BACKGROUND ========== */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = 'アァカサタナハマヤラワ0123456789'.split('');
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff55';
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    const ch = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 35);

/* ========== SECTION NAVIGATION ========== */
const home = document.getElementById('home');
const gallery = document.getElementById('gallery');
const about = document.getElementById('about');
const playlists = document.getElementById('playlists');

function showSection(section) {
  [home, gallery, about, playlists].forEach(s => s.classList.add('hidden'));
  section.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('link-home').addEventListener('click', e => { e.preventDefault(); showSection(home); });
document.getElementById('link-gallery').addEventListener('click', e => { e.preventDefault(); showSection(gallery); });
document.getElementById('link-about').addEventListener('click', e => { e.preventDefault(); showSection(about); });
document.getElementById('link-playlists').addEventListener('click', e => { e.preventDefault(); showSection(playlists); });

document.getElementById('galleryClose').addEventListener('click', () => showSection(home));
document.getElementById('aboutClose').addEventListener('click', () => showSection(home));
document.getElementById('playlistClose').addEventListener('click', () => showSection(home));

/* ========== GALLERY MODAL ========== */
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.card-thumb img').forEach(img => {
  img.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modalImg.src = img.src;
  });
});
modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

/* ========== PLAYLIST PLAYER ========== */
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const timeCurrent = document.getElementById('timeCurrent');
const timeTotal = document.getElementById('timeTotal');
const nowTitle = document.getElementById('nowTitle');
const nowArtist = document.getElementById('nowArtist');
const playlistList = document.getElementById('playlistList');

/* === MÚSICAS === */
const tracks = [
  { title: "Daydreamin' (feat. Jill Scott)", artist: "Lupe Fiasco", src: "https://www.dropbox.com/scl/fi/f1jjoo8xvhkp2ugoeenb6/Daydreamin-feat.-Jill-Scott-C0rcii5DCms.mp3?raw=1" },
  { title: "Fed Up", artist: "UXlJgVmqFXw", src: "https://www.dropbox.com/scl/fi/rl6lu43744alkmoclhw70/Fed-Up-UXlJgVmqFXw.mp3?raw=1" },
  { title: "Mercury", artist: "GHOSTEMANE", src: "https://www.dropbox.com/scl/fi/rgnqyofwbte4z5bxrxrgm/GHOSTEMANE-Mercury-31j4DIpgY9U.mp3?raw=1" },
  { title: "Ultimate Summoning Booster", artist: "Unknown Artist", src: "https://www.dropbox.com/scl/fi/ik8iy5aidq01bflc82rxh/Ultimate-Summoning-Booster-ws2CuQ3PGxY.mp3?raw=1" },
  { title: "Adagio", artist: "Zhasulan Sydykov", src: "https://www.dropbox.com/scl/fi/3wqgcno6xxs23tvl5c700/Adagio-by-Zhasulan-Sydykov-Zhasulan-Sydykov-youtube.mp3?raw=1" },
  { title: "Voilà", artist: "Barbara Pravi", src: "https://www.dropbox.com/scl/fi/bwufqejqq1xbaiqb64egl/Barbara-Pravi-Voil-Paroles_Lyrics-Creative-Chaos-youtube.mp3?raw=1" },
  { title: "Il Mondo", artist: "Jimmy Fontana", src: "https://www.dropbox.com/scl/fi/l11mn5m1yb6iqwfzpy08v/Jimmy-Fontana-Il-Mondo-Legendas-IT-PT-BR-Magyart-HD-Videos-youtube.mp3?raw=1" },
  { title: "My Way (2008 Remastered)", artist: "Frank Sinatra", src: "https://www.dropbox.com/scl/fi/zqii1wyov2umq39q2v36g/My-Way-2008-Remastered-Frank-Sinatra-youtube.mp3?raw=1" }
];

let currentIndex = -1;
let isPlaying = false;

/* Render playlist list */
function renderPlaylist() {
  playlistList.innerHTML = '';
  tracks.forEach((track, i) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.dataset.index = i;
    item.innerHTML = `
      <div class="pli-index">${i + 1}</div>
      <div><div class="pli-title">${track.title}</div><div class="pli-sub">${track.artist}</div></div>
    `;
    item.addEventListener('click', () => {
      loadTrack(i);
      playTrack();
    });
    playlistList.appendChild(item);
  });
}
renderPlaylist();

function updateActive() {
  document.querySelectorAll('.playlist-item').forEach(e => e.classList.remove('active'));
  const active = document.querySelector(`.playlist-item[data-index="${currentIndex}"]`);
  if (active) active.classList.add('active');
}

function loadTrack(i) {
  if (i < 0 || i >= tracks.length) return;
  const track = tracks[i];
  audio.src = track.src;
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist;
  currentIndex = i;
  updateActive();
  audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(audio.duration);
  }, { once: true });
}

function playTrack() {
  if (!audio.src) {
    loadTrack(0);
  }
  audio.play().then(() => {
    isPlaying = true;
    playPauseBtn.textContent = '⏸';
  }).catch(err => console.log('Erro ao reproduzir:', err));
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.textContent = '▶';
}

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) pauseTrack();
  else {
    if (currentIndex === -1) loadTrack(0);
    playTrack();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) loadTrack(currentIndex - 1);
  else loadTrack(tracks.length - 1);
  playTrack();
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < tracks.length - 1) loadTrack(currentIndex + 1);
  else loadTrack(0);
  playTrack();
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = progress + '%';
    timeCurrent.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

progressBar.addEventListener('click', e => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  const x = e.clientX - rect.left;
  audio.currentTime = (x / rect.width) * audio.duration;
});

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' + s : s}`;
}
