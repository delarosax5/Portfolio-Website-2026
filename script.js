// ---------- Hero intro animation ----------
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('is-in'));
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
revealEls.forEach((el) => io.observe(el));

// ---------- Custom cursor ----------
const cursor = document.querySelector('[data-cursor]');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  curX += (mouseX - curX) * 0.18;
  curY += (mouseY - curY) * 0.18;
  if (cursor) cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Grow cursor over interactive elements
document.querySelectorAll('a, [data-link], button').forEach((el) => {
  el.addEventListener('mouseenter', () => cursor && cursor.classList.add('is-hover'));
  el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('is-hover'));
});

// ---------- Subtle 3D tilt on project cards ----------
document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform =
      `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
