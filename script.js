// Active nav highlight
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.sections a').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
})();

// Scroll reveal
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el=>io.observe(el));
})();

// Count-up stats: numbers stay grayscale until scrolled into view,
// then tick up and turn accent-colored — data "waking up".
(function(){
  const stats = document.querySelectorAll('.stat');
  if(!stats.length) return;

  function animate(el){
    const numEl = el.querySelector('.num');
    const target = parseFloat(numEl.dataset.target);
    const suffix = numEl.dataset.suffix || '';
    const decimals = numEl.dataset.decimals ? parseInt(numEl.dataset.decimals) : 0;
    const duration = 900;
    const start = performance.now();

    el.classList.add('on');

    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      numEl.textContent = val.toFixed(decimals) + suffix;
      if(p < 1) requestAnimationFrame(tick);
      else numEl.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }

  if(!('IntersectionObserver' in window)){
    stats.forEach(animate);
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  stats.forEach(el=>io.observe(el));
})();
