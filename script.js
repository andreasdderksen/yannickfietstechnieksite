(() => {
  const track = document.getElementById('reviewTrack');
  const prev = document.getElementById('reviewPrev');
  const next = document.getElementById('reviewNext');
  if (!track || !prev || !next) return;

  const carousel = track.parentElement;
  const INTERVAL = 5000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null;

  const step = () => {
    const card = track.querySelector('.review');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const go = (dir) => {
    const max = track.scrollWidth - track.clientWidth;
    if (dir > 0 && track.scrollLeft >= max - 1) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dir < 0 && track.scrollLeft <= 1) {
      track.scrollTo({ left: max, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: dir * step(), behavior: 'smooth' });
    }
  };

  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => {
    if (reduceMotion || timer) return;
    timer = setInterval(() => go(1), INTERVAL);
  };
  const restart = () => { stop(); start(); };

  prev.addEventListener('click', () => { go(-1); restart(); });
  next.addEventListener('click', () => { go(1); restart(); });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  carousel.addEventListener('touchstart', stop, { passive: true });
  carousel.addEventListener('touchend', restart, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  start();
})();

(() => {
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
