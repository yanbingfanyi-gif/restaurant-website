// ── Progress bar ──
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
});

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── Fade-in on scroll ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Animated counters ──
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const fmt    = el.dataset.format === 'comma';
  const isDecimal = String(target).includes('.');
  const duration = 1600, step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    const display = fmt
      ? Math.floor(current).toLocaleString()
      : isDecimal ? current.toFixed(1) : Math.floor(current);
    el.textContent = display + suffix;
  }, step);
}
const cObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1';
      animateCounter(e.target);
    }
  }),
  { threshold: 0.5 }
);
document.querySelectorAll('.counter').forEach(el => cObs.observe(el));

// ── Menu filter tabs ──
document.querySelectorAll('.mtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.cat;
    document.querySelectorAll('.menu-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
    });
  });
});

// ── Set min date for reservation ──
const dateInput = document.getElementById('resDate');
if (dateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];
}

// ── Reservation form ──
document.getElementById('reserveForm').addEventListener('submit', e => {
  e.preventDefault();
  const success = document.getElementById('resSuccess');
  success.classList.add('show');
  e.target.reset();
  success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => success.classList.remove('show'), 6000);
});

// ── Back to top ──
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!link) return;
    link.style.color = (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight)
      ? 'var(--gold)' : '';
  });
});
