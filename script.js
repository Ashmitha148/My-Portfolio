// ===== STARFIELD =====
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.floor((w * h) / 3500);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.25 + 0.05,
      alpha: Math.random(),
      delta: Math.random() * 0.015 + 0.003
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w * 0.7);
  grad.addColorStop(0, 'rgba(124, 58, 237, 0.025)');
  grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.015)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  stars.forEach(s => {
    s.alpha += s.delta;
    if (s.alpha > 1 || s.alpha < 0.15) s.delta *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    ctx.fill();
    s.y -= s.speed;
    if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }
  });

  requestAnimationFrame(draw);
}

resize();
initStars();
draw();
window.addEventListener('resize', () => { resize(); initStars(); });

// ===== TYPEWRITER =====
const phrases = [
  'Competitive Programmer',
  'Full-Stack Developer',
  'Problem Solver',
  'DSA Enthusiast'
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typeEl = document.getElementById('typewriter');
const cursorEl = document.createElement('span');
cursorEl.className = 'cursor';

function type() {
  const current = phrases[phraseIdx];
  if (deleting) {
    charIdx--;
  } else {
    charIdx++;
  }

  typeEl.textContent = current.substring(0, charIdx);
  typeEl.appendChild(cursorEl);

  let speed = deleting ? 60 : 120;
  if (!deleting && charIdx === current.length) {
    speed = 2000;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}
type();

// ===== SCROLL ANIMATIONS =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.15 });

sections.forEach(s => observer.observe(s));

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ===== SMOOTH SCROLL =====
function scrollToSection(id) {
  event.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('navLinks').classList.remove('open');
  }
}

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}