// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('mobileDrawer');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = hamburger.classList.toggle('open');
  drawer.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

function closeNav() {
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !drawer.contains(e.target)) closeNav();
});

// ── SCROLL REVEAL ──
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ── FAQ ──
function toggleFaq(qEl) {
  const item   = qEl.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '+';
  const dur = 1500, start = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(target * ease).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(start);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cntObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => cntObs.observe(el));

// ── LIVE TRADE COUNTER ──
(function() {
  const el = document.getElementById('liveCount');
  if (!el) return;
  let count = Math.floor(Math.random() * 8) + 4;
  el.textContent = count;
  setInterval(() => {
    if (Math.random() < 0.45) {
      count += Math.floor(Math.random() * 2) + 1;
      el.style.opacity = '0.4';
      setTimeout(() => { el.textContent = count; el.style.opacity = '1'; }, 200);
    }
  }, 8000);
})();

// ── LIVE BALANCE FLICKER ──
setInterval(() => {
  const el = document.getElementById('balAmt');
  if (!el) return;
  const cur  = parseFloat(el.textContent.replace(/[$,]/g, ''));
  const next = cur + (Math.random() - 0.48) * 15;
  el.textContent = '$' + next.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}, 3000);