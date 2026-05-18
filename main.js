// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && dot && ring) {
  document.addEventListener('mousemove', e => { 
    mx = e.clientX; 
    my = e.clientY; 
    dot.style.left = mx + 'px'; 
    dot.style.top = my + 'px'; 
  });
  function animRing() { 
    rx += (mx - rx) * 0.12; 
    ry += (my - ry) * 0.12; 
    ring.style.left = rx + 'px'; 
    ring.style.top = ry + 'px'; 
    requestAnimationFrame(animRing); 
  }
  animRing();
}

// ===== LIVE TICKER =====
const messages = [
  'Pipeline processed 12,847 records today',
  'Model accuracy: 94.2% on test set',
  'Dashboard views: 3.2K this week',
  'GATE CSE 2026 — Top 5.7% nationally',
  'AWS spend optimized by 23%',
  'API response time: 142ms avg',
];
let ti = 0;
const liveTickerEl = document.getElementById('liveTicker');
if (liveTickerEl) {
  function rotateTicker() {
    liveTickerEl.style.opacity = 0;
    setTimeout(() => { 
      liveTickerEl.textContent = messages[ti++ % messages.length]; 
      liveTickerEl.style.opacity = 1; 
    }, 300);
  }
  rotateTicker();
  setInterval(rotateTicker, 3000);
  liveTickerEl.style.transition = 'opacity 0.3s';
}

// ===== SCROLL ANIMATIONS =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { 
    if (e.isIntersecting) e.target.classList.add('visible'); 
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Skill bars
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-panel').forEach(el => skillObs.observe(el));

// ===== FORM INTERACTIVES =====
function handleSend(btn) {
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#2ea86e';
  setTimeout(() => { 
    btn.textContent = 'Send Message →'; 
    btn.style.background = ''; 
  }, 3000);
}

// ===== STAT COUNTER ANIMATION =====
document.querySelectorAll('[data-target]').forEach(el => {
  const target = parseFloat(el.dataset.target);
  const span = el.querySelector('span');
  if (!span) return;
  let current = 0;
  const counterObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const interval = setInterval(() => {
        current += target / 60;
        if (current >= target) { 
          current = target; 
          clearInterval(interval); 
        }
        span.textContent = current.toFixed(target % 1 !== 0 ? 1 : 0);
      }, 20);
      counterObs.disconnect();
    }
  });
  counterObs.observe(el);
});
