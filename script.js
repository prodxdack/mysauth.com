const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const motionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('is-in-view', entry.isIntersecting);
  });
}, { rootMargin: '120px 0px', threshold: 0.01 });

document.documentElement.classList.add('js-motion');
document.querySelectorAll('.brand-card, .product-card').forEach((card) => motionObserver.observe(card));

const canTrackPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canTrackPointer) {
  document.querySelectorAll('.brand-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      const shiftX = Math.max(-6, Math.min(6, (x - 50) / 8));
      const shiftY = Math.max(-5, Math.min(5, (y - 50) / 10));
      card.style.setProperty('--pointer-x', x + '%');
      card.style.setProperty('--pointer-y', y + '%');
      card.style.setProperty('--parallax-x', shiftX + 'px');
      card.style.setProperty('--parallax-y', shiftY + 'px');
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--pointer-x', '50%');
      card.style.setProperty('--pointer-y', '50%');
      card.style.setProperty('--parallax-x', '0px');
      card.style.setProperty('--parallax-y', '0px');
    }, { passive: true });
  });
}

const updateVisibilityState = () => {
  document.documentElement.classList.toggle('page-hidden', document.hidden);
};
document.addEventListener('visibilitychange', updateVisibilityState);

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();
