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

const canTrackPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canTrackPointer) {
  document.querySelectorAll('.brand-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', (((event.clientX - bounds.left) / bounds.width) * 100) + '%');
      card.style.setProperty('--pointer-y', (((event.clientY - bounds.top) / bounds.height) * 100) + '%');
    }, { passive: true });
  });
}

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();
