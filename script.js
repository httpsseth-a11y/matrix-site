// MATRIX RAIN
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const chars = "01@#$%&*+-/\\";
const fontSize = 14;
const cols = canvas.width / fontSize;
const drops = Array(Math.floor(cols)).fill(1);

function draw(){
  ctx.fillStyle='rgba(0,0,0,0.05)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#00ff90';
  ctx.font=fontSize+'px monospace';
  drops.forEach((y,i)=>{
    const text=chars.charAt(Math.floor(Math.random()*chars.length));
    ctx.fillText(text,i*fontSize,y*fontSize);
    if(y*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;
    drops[i]++;
  });
  requestAnimationFrame(draw);
}
draw();

// MENU
const links=document.querySelectorAll('.nav-center a');
const sections=document.querySelectorAll('main section');
links.forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const id=link.getAttribute('href').substring(1);
    sections.forEach(sec=>sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    links.forEach(a=>a.classList.remove('active'));
    link.classList.add('active');
  });
});

// GALLERY CLOSE
document.querySelector('.close-gallery').addEventListener('click',()=>{
  document.querySelector('#gallery').classList.add('hidden');
  document.querySelector('#home').classList.remove('hidden');
  document.querySelector('a[href="#home"]').classList.add('active');
});

// ABOUT CLOSE
document.querySelector('.close-about').addEventListener('click',()=>{
  document.querySelector('#about').classList.add('hidden');
  document.querySelector('#home').classList.remove('hidden');
  document.querySelector('a[href="#home"]').classList.add('active');
});

// PLAYER
const playBtn=document.getElementById('play');
const music=document.getElementById('music');
let playing=false;
playBtn.addEventListener('click',()=>{
  playing=!playing;
  if(playing){music.play();playBtn.textContent='❚❚';}
  else{music.pause();playBtn.textContent='▶';}
});
